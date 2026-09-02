"""
gen-thumbnail.py — generate the thumbnail hero image (Flux) + cut-out (rembg)
from a youtube-meta.<slug>.json thumbnail brief.

Usage: python scripts/gen-thumbnail.py youtube-meta.single-dad-dilemma.json
"""
import requests, base64, os, sys, time, json

ROOT = os.path.join(os.path.dirname(__file__), "..")
try:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(ROOT, ".env"))
except Exception:
    pass

API_KEY = os.environ.get("NVIDIA_API_KEY")
if not API_KEY:
    print("ERROR: NVIDIA_API_KEY not found"); sys.exit(1)
INVOKE_URL = "https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.2-klein-4b"

meta_path = sys.argv[1] if len(sys.argv) > 1 else "youtube-meta.single-dad-dilemma.json"
with open(os.path.join(ROOT, meta_path), "r", encoding="utf-8") as f:
    meta = json.load(f)

thumb = meta["thumbnail"]
subject = thumb["subject"]
img_rel = thumb["image"]
cut_rel = thumb.get("cut")

prompt = (
    f"{subject}. dramatic cinematic close-up, bold rim lighting, high contrast, strong emotion, "
    f"single clear subject, shallow depth of field, poster-quality, vivid, eye-catching, no text, no watermark, 8k"
)

def gen(rel, prompt):
    out = os.path.join(ROOT, "public", rel)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    payload = {"prompt": prompt, "width": 1024, "height": 1024, "steps": 4}
    headers = {"Authorization": f"Bearer {API_KEY}", "Accept": "application/json"}
    for attempt in range(1, 5):
        try:
            print(f"[hero] attempt {attempt}", flush=True)
            r = requests.post(INVOKE_URL, headers=headers, json=payload, timeout=120)
            if r.status_code == 200:
                arts = r.json().get("artifacts") or []
                b64 = arts[0].get("base64") if arts else None
                if b64:
                    with open(out, "wb") as fh:
                        fh.write(base64.b64decode(b64))
                    print(f"  [OK] {rel} ({os.path.getsize(out)/1024:.0f} KB)"); return True
            print(f"  [ERR] HTTP {r.status_code}: {r.text[:140]}")
        except Exception as e:
            print(f"  [ERR] {e}")
        time.sleep(8 * attempt)
    return False

if not gen(img_rel, prompt):
    print("hero generation failed"); sys.exit(1)

# cut-out
if cut_rel:
    try:
        from rembg import remove, new_session
        from PIL import Image
        session = new_session("u2net")
        img = Image.open(os.path.join(ROOT, "public", img_rel)).convert("RGBA")
        out = remove(img, session=session, post_process_mask=True)
        # trim to subject bbox
        bbox = out.split()[3].point(lambda a: 255 if a > 10 else 0).getbbox()
        if bbox:
            out = out.crop(bbox)
        dst = os.path.join(ROOT, "public", cut_rel)
        out.save(dst)
        print(f"  [OK] cutout {cut_rel} ({out.width}x{out.height})")
    except Exception as e:
        print(f"  [WARN] cutout failed ({e}); thumbnail will use the full hero image.")

print("DONE")
