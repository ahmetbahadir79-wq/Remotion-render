# never-lie

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/never-lie.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | `out/thumbnail-never-lie.png` _(yok)_ | YouTube kapak |
| 📝 YouTube pack | `books/never-lie/youtube.md` _(yok)_ | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | `public/captions/never-lie.clean.vtt` _(yok)_ | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/never-lie.vtt`](../../public/captions/never-lie.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | `public/audio/never-lie.m4a` _(yok)_ | NotebookLM sesi |
| 🖼️ Scene images | `public/scenes/never-lie/` _(yok)_ | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/never-lie/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/never-lie/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/never-lie/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | `books/never-lie/youtube-meta.json` _(yok)_ | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-never-lie_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/never-lie.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-never-lie.png`
4. CC → `never-lie.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=never-lie --title="never-lie"
```
