# Lord of the Flies — William Golding  ·  _classics_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/lord-of-the-flies.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-lord-of-the-flies.png`](../../out/thumbnail-lord-of-the-flies.png) | YouTube kapak |
| 📝 YouTube pack | [`books/lord-of-the-flies/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/lord-of-the-flies.clean.vtt`](../../public/captions/lord-of-the-flies.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/lord-of-the-flies.vtt`](../../public/captions/lord-of-the-flies.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/lord-of-the-flies.m4a`](../../public/audio/lord-of-the-flies.m4a) | NotebookLM sesi |
| 🖼️ Scene images | [`public/scenes/lord-of-the-flies/`](../../public/scenes/lord-of-the-flies) | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/lord-of-the-flies/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/lord-of-the-flies/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/lord-of-the-flies/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/lord-of-the-flies/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-lord-of-the-flies_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/lord-of-the-flies.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-lord-of-the-flies.png`
4. CC → `lord-of-the-flies.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=lord-of-the-flies --title="Lord of the Flies" --author="William Golding" --genre=classics
```
