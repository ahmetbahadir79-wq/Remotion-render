# North Woods — Daniel Mason  ·  _fiction_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/north-woods.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-north-woods.png`](../../out/thumbnail-north-woods.png) | YouTube kapak |
| 📝 YouTube pack | [`books/north-woods/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/north-woods.clean.vtt`](../../public/captions/north-woods.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/north-woods.vtt`](../../public/captions/north-woods.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | `public/audio/north-woods.m4a` _(yok)_ | NotebookLM sesi |
| 🖼️ Scene images | [`public/scenes/north-woods/`](../../public/scenes/north-woods) | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/north-woods/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/north-woods/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | [`books/north-woods/config.vox.json`](config.vox.json) | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/north-woods/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-north-woods_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/north-woods.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-north-woods.png`
4. CC → `north-woods.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=north-woods --title="North Woods" --author="Daniel Mason" --genre=fiction
```
