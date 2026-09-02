const { STSClient, GetSessionTokenCommand } = require("@aws-sdk/client-sts");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// MFA ARN + 6-digit code are COMMAND ARGUMENTS (not stored in .env).
const mfaArn = process.argv[2]; // e.g. arn:aws:iam::038711413180:mfa/googleauth
const mfaToken = process.argv[3]; // e.g. 123456

if (!mfaArn || !mfaToken) {
  console.error('Kullanım: node get_mfa_token.js "<MFA_ARN>" <6_HANELI_KOD>');
  process.exit(1);
}

// Long-term IAM keys live under BASE names so refreshing never overwrites them.
// Falls back to the old REMOTION_AWS_* names for backward compatibility.
const baseKey = process.env.REMOTION_AWS_BASE_ACCESS_KEY_ID || process.env.REMOTION_AWS_ACCESS_KEY_ID;
const baseSecret = process.env.REMOTION_AWS_BASE_SECRET_ACCESS_KEY || process.env.REMOTION_AWS_SECRET_ACCESS_KEY;

if (!baseKey || !baseSecret) {
  console.error("HATA: .env içinde kalıcı IAM anahtarları yok.");
  console.error("Şunları ekle:\n  REMOTION_AWS_BASE_ACCESS_KEY_ID=AKIA...\n  REMOTION_AWS_BASE_SECRET_ACCESS_KEY=...");
  process.exit(1);
}
if (!baseKey.startsWith("AKIA")) {
  console.warn("UYARI: base anahtar 'AKIA' ile başlamıyor — geçici (ASIA) bir anahtar girmiş olabilirsin; MFA yenilemesi başarısız olur.");
}

// Update (or append) keys in .env, preserving all other lines.
function setEnv(vars) {
  const envPath = path.join(__dirname, ".env");
  let lines = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8").split(/\r?\n/) : [];
  for (const [k, v] of Object.entries(vars)) {
    const idx = lines.findIndex((l) => l.startsWith(k + "="));
    if (idx >= 0) lines[idx] = `${k}=${v}`;
    else lines.push(`${k}=${v}`);
  }
  fs.writeFileSync(envPath, lines.filter((l, i) => !(l === "" && i === lines.length - 1)).join("\n") + "\n");
}

async function getToken() {
  const client = new STSClient({ region: "us-east-1", credentials: { accessKeyId: baseKey, secretAccessKey: baseSecret } });
  try {
    const { Credentials } = await client.send(
      new GetSessionTokenCommand({ SerialNumber: mfaArn, TokenCode: mfaToken, DurationSeconds: 43200 }),
    );
    // Remotion Lambda reads REMOTION_AWS_* — write the SESSION creds there.
    setEnv({
      REMOTION_AWS_ACCESS_KEY_ID: Credentials.AccessKeyId,
      REMOTION_AWS_SECRET_ACCESS_KEY: Credentials.SecretAccessKey,
      REMOTION_AWS_SESSION_TOKEN: Credentials.SessionToken,
    });
    const exp = new Date(Credentials.Expiration);
    console.log("\n✅ Geçici oturum .env'ye yazıldı (12 saat geçerli).");
    console.log("   Bitiş:", exp.toLocaleString());
    console.log("   Base anahtarların korundu (REMOTION_AWS_BASE_*).");
    console.log("\nArtık 'hazır' de — deploy + site + render başlatılabilir.");
  } catch (error) {
    console.error("HATA:", error.message);
    process.exit(1);
  }
}

getToken();
