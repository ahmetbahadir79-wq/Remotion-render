# die-with-zero

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/die-with-zero.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | `out/thumbnail-die-with-zero.png` _(yok)_ | YouTube kapak |
| 📝 YouTube pack | `books/die-with-zero/youtube.md` _(yok)_ | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | `public/captions/die-with-zero.clean.vtt` _(yok)_ | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/die-with-zero.vtt`](../../public/captions/die-with-zero.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/die-with-zero.m4a`](../../public/audio/die-with-zero.m4a) | NotebookLM sesi |
| 🖼️ Scene images | `public/scenes/die-with-zero/` _(yok)_ | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/die-with-zero/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/die-with-zero/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/die-with-zero/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | `books/die-with-zero/youtube-meta.json` _(yok)_ | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-die-with-zero_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/die-with-zero.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-die-with-zero.png`
4. CC → `die-with-zero.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=die-with-zero --title="die-with-zero"
```
