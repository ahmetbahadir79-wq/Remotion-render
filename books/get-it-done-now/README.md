# get-it-done-now

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/get-it-done-now.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | `out/thumbnail-get-it-done-now.png` _(yok)_ | YouTube kapak |
| 📝 YouTube pack | `books/get-it-done-now/youtube.md` _(yok)_ | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | `public/captions/get-it-done-now.clean.vtt` _(yok)_ | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/get-it-done-now.vtt`](../../public/captions/get-it-done-now.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | `public/audio/get-it-done-now.m4a` _(yok)_ | NotebookLM sesi |
| 🖼️ Scene images | `public/scenes/get-it-done-now/` _(yok)_ | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/get-it-done-now/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/get-it-done-now/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/get-it-done-now/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | `books/get-it-done-now/youtube-meta.json` _(yok)_ | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-get-it-done-now_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/get-it-done-now.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-get-it-done-now.png`
4. CC → `get-it-done-now.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=get-it-done-now --title="get-it-done-now"
```
