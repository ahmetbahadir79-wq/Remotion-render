# The Iliad — Homer  ·  _classics_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/the-iliad.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-the-iliad.png`](../../out/thumbnail-the-iliad.png) | YouTube kapak |
| 📝 YouTube pack | [`books/the-iliad/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/the-iliad.clean.vtt`](../../public/captions/the-iliad.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/the-iliad.vtt`](../../public/captions/the-iliad.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/the-iliad.m4a`](../../public/audio/the-iliad.m4a) | NotebookLM sesi |
| 🖼️ Scene images | [`public/scenes/the-iliad/`](../../public/scenes/the-iliad) | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/the-iliad/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/the-iliad/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | [`books/the-iliad/config.vox.json`](config.vox.json) | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/the-iliad/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-the-iliad_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/the-iliad.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-the-iliad.png`
4. CC → `the-iliad.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=the-iliad --title="The Iliad" --author="Homer" --genre=classics
```
