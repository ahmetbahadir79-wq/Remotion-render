# The Girl with the Dragon Tattoo — Stieg Larsson  ·  _thriller_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/the-girl-with-the-dragon-tattoo.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-the-girl-with-the-dragon-tattoo.png`](../../out/thumbnail-the-girl-with-the-dragon-tattoo.png) | YouTube kapak |
| 📝 YouTube pack | [`books/the-girl-with-the-dragon-tattoo/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/the-girl-with-the-dragon-tattoo.clean.vtt`](../../public/captions/the-girl-with-the-dragon-tattoo.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/the-girl-with-the-dragon-tattoo.vtt`](../../public/captions/the-girl-with-the-dragon-tattoo.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/the-girl-with-the-dragon-tattoo.m4a`](../../public/audio/the-girl-with-the-dragon-tattoo.m4a) | NotebookLM sesi |
| 🖼️ Scene images | [`public/scenes/the-girl-with-the-dragon-tattoo/`](../../public/scenes/the-girl-with-the-dragon-tattoo) | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/the-girl-with-the-dragon-tattoo/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/the-girl-with-the-dragon-tattoo/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | [`books/the-girl-with-the-dragon-tattoo/config.vox.json`](config.vox.json) | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/the-girl-with-the-dragon-tattoo/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-the-girl-with-the-dragon-tattoo_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/the-girl-with-the-dragon-tattoo.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-the-girl-with-the-dragon-tattoo.png`
4. CC → `the-girl-with-the-dragon-tattoo.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=the-girl-with-the-dragon-tattoo --title="The Girl with the Dragon Tattoo" --author="Stieg Larsson" --genre=thriller
```
