# Just Mercy — Bryan Stevenson  ·  _nonfiction_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/just-mercy.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-just-mercy.png`](../../out/thumbnail-just-mercy.png) | YouTube kapak |
| 📝 YouTube pack | [`books/just-mercy/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/just-mercy.clean.vtt`](../../public/captions/just-mercy.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/just-mercy.vtt`](../../public/captions/just-mercy.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/just-mercy.m4a`](../../public/audio/just-mercy.m4a) | NotebookLM sesi |
| 🖼️ Scene images | [`public/scenes/just-mercy/`](../../public/scenes/just-mercy) | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/just-mercy/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/just-mercy/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | [`books/just-mercy/config.vox.json`](config.vox.json) | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/just-mercy/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-just-mercy_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/just-mercy.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-just-mercy.png`
4. CC → `just-mercy.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=just-mercy --title="Just Mercy" --author="Bryan Stevenson" --genre=nonfiction
```
