# deep-work

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/deep-work.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | `out/thumbnail-deep-work.png` _(yok)_ | YouTube kapak |
| 📝 YouTube pack | `books/deep-work/youtube.md` _(yok)_ | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | `public/captions/deep-work.clean.vtt` _(yok)_ | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/deep-work.vtt`](../../public/captions/deep-work.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | `public/audio/deep-work.m4a` _(yok)_ | NotebookLM sesi |
| 🖼️ Scene images | `public/scenes/deep-work/` _(yok)_ | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/deep-work/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/deep-work/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/deep-work/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | `books/deep-work/youtube-meta.json` _(yok)_ | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-deep-work_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/deep-work.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-deep-work.png`
4. CC → `deep-work.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=deep-work --title="deep-work"
```
