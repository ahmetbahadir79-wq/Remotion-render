# Martyr! — Kaveh Akbar  ·  _fiction_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/martyr.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-martyr.png`](../../out/thumbnail-martyr.png) | YouTube kapak |
| 📝 YouTube pack | [`books/martyr/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/martyr.clean.vtt`](../../public/captions/martyr.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/martyr.vtt`](../../public/captions/martyr.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/martyr.m4a`](../../public/audio/martyr.m4a) | NotebookLM sesi |
| 🖼️ Scene images | [`public/scenes/martyr/`](../../public/scenes/martyr) | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/martyr/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/martyr/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | [`books/martyr/config.vox.json`](config.vox.json) | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/martyr/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-martyr_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/martyr.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-martyr.png`
4. CC → `martyr.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=martyr --title="Martyr!" --author="Kaveh Akbar" --genre=fiction
```
