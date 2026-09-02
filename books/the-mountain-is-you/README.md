# The Mountain Is You — Brianna Wiest  ·  _psychology_

> Bu kitabın **hub klasörü**. Tüm dosyalara buradan ulaş. Makine-JSON'ları (vox-config, youtube-meta) pipeline'a gömülü olduğu için **kökte** durur — aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/the-mountain-is-you.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-the-mountain-is-you.png`](../../out/thumbnail-the-mountain-is-you.png) | YouTube kapak |
| 📝 YouTube pack | [`books/the-mountain-is-you/youtube.md`](../../books/the-mountain-is-you/youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/the-mountain-is-you.clean.vtt`](../../public/captions/the-mountain-is-you.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/the-mountain-is-you.vtt`](../../public/captions/the-mountain-is-you.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/the-mountain-is-you.m4a`](../../public/audio/the-mountain-is-you.m4a) | NotebookLM sesi |
| 🖼️ Scene images | [`public/scenes/the-mountain-is-you/`](../../public/scenes/the-mountain-is-you/) | Flux görselleri |
| ✍️ NotebookLM prompt | `prompts/notebooklm-prompt.the-mountain-is-you.md` _(yok)_ | Doug Stevenson açısı |
| ⚙️ vox-config (makine) | [`vox-config.the-mountain-is-you.json`](../../vox-config.the-mountain-is-you.json) | KÖK — pipeline'a gömülü, taşıma |
| ⚙️ youtube-meta (makine) | [`youtube-meta.the-mountain-is-you.json`](../../youtube-meta.the-mountain-is-you.json) | KÖK — import-coupled, taşıma |
| 🎞️ Render chunks | `out_Vox-the-mountain-is-you_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/the-mountain-is-you.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-the-mountain-is-you.png`
4. CC → `the-mountain-is-you.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=the-mountain-is-you --title="The Mountain Is You" --author="Brianna Wiest" --genre=psychology
```
