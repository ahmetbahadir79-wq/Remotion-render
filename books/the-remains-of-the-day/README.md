# the-remains-of-the-day

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/the-remains-of-the-day.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | `out/thumbnail-the-remains-of-the-day.png` _(yok)_ | YouTube kapak |
| 📝 YouTube pack | `books/the-remains-of-the-day/youtube.md` _(yok)_ | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | `public/captions/the-remains-of-the-day.clean.vtt` _(yok)_ | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/the-remains-of-the-day.vtt`](../../public/captions/the-remains-of-the-day.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | `public/audio/the-remains-of-the-day.m4a` _(yok)_ | NotebookLM sesi |
| 🖼️ Scene images | `public/scenes/the-remains-of-the-day/` _(yok)_ | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/the-remains-of-the-day/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/the-remains-of-the-day/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/the-remains-of-the-day/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | `books/the-remains-of-the-day/youtube-meta.json` _(yok)_ | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-the-remains-of-the-day_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/the-remains-of-the-day.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-the-remains-of-the-day.png`
4. CC → `the-remains-of-the-day.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=the-remains-of-the-day --title="the-remains-of-the-day"
```
