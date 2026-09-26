# The Southern Book Club's Guide to Slaying Vampires — Grady Hendrix  ·  _horror_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/the-southern-book-club-s-guide-to-slaying-vampires.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-the-southern-book-club-s-guide-to-slaying-vampires.png`](../../out/thumbnail-the-southern-book-club-s-guide-to-slaying-vampires.png) | YouTube kapak |
| 📝 YouTube pack | [`books/the-southern-book-club-s-guide-to-slaying-vampires/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/the-southern-book-club-s-guide-to-slaying-vampires.clean.vtt`](../../public/captions/the-southern-book-club-s-guide-to-slaying-vampires.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/the-southern-book-club-s-guide-to-slaying-vampires.vtt`](../../public/captions/the-southern-book-club-s-guide-to-slaying-vampires.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/the-southern-book-club-s-guide-to-slaying-vampires.m4a`](../../public/audio/the-southern-book-club-s-guide-to-slaying-vampires.m4a) | NotebookLM sesi |
| 🖼️ Scene images | `public/scenes/the-southern-book-club-s-guide-to-slaying-vampires/` _(yok)_ | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/the-southern-book-club-s-guide-to-slaying-vampires/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/the-southern-book-club-s-guide-to-slaying-vampires/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/the-southern-book-club-s-guide-to-slaying-vampires/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/the-southern-book-club-s-guide-to-slaying-vampires/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-the-southern-book-club-s-guide-to-slaying-vampires_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/the-southern-book-club-s-guide-to-slaying-vampires.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-the-southern-book-club-s-guide-to-slaying-vampires.png`
4. CC → `the-southern-book-club-s-guide-to-slaying-vampires.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=the-southern-book-club-s-guide-to-slaying-vampires --title="The Southern Book Club's Guide to Slaying Vampires" --author="Grady Hendrix" --genre=horror
```
