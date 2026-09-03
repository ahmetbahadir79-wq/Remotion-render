# Educated — Tara Westover  ·  _memoir_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/educated.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | `out/thumbnail-educated.png` _(yok)_ | YouTube kapak |
| 📝 YouTube pack | [`books/educated/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/educated.clean.vtt`](../../public/captions/educated.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/educated.vtt`](../../public/captions/educated.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/educated.m4a`](../../public/audio/educated.m4a) | NotebookLM sesi |
| 🖼️ Scene images | [`public/scenes/educated/`](../../public/scenes/educated) | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/educated/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/educated/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | [`books/educated/config.vox.json`](config.vox.json) | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/educated/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-educated_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/educated.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-educated.png`
4. CC → `educated.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=educated --title="Educated" --author="Tara Westover" --genre=memoir
```
