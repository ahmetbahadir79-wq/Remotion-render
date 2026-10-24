# Do Not Say We Have Nothing — Madeleine Thien  ·  _historical-fiction_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/do-not-say-we-have-nothing.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-do-not-say-we-have-nothing.png`](../../out/thumbnail-do-not-say-we-have-nothing.png) | YouTube kapak |
| 📝 YouTube pack | [`books/do-not-say-we-have-nothing/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/do-not-say-we-have-nothing.clean.vtt`](../../public/captions/do-not-say-we-have-nothing.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/do-not-say-we-have-nothing.vtt`](../../public/captions/do-not-say-we-have-nothing.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/do-not-say-we-have-nothing.m4a`](../../public/audio/do-not-say-we-have-nothing.m4a) | NotebookLM sesi |
| 🖼️ Scene images | [`public/scenes/do-not-say-we-have-nothing/`](../../public/scenes/do-not-say-we-have-nothing) | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/do-not-say-we-have-nothing/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/do-not-say-we-have-nothing/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | [`books/do-not-say-we-have-nothing/config.vox.json`](config.vox.json) | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/do-not-say-we-have-nothing/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-do-not-say-we-have-nothing_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/do-not-say-we-have-nothing.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-do-not-say-we-have-nothing.png`
4. CC → `do-not-say-we-have-nothing.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=do-not-say-we-have-nothing --title="Do Not Say We Have Nothing" --author="Madeleine Thien" --genre=historical-fiction
```
