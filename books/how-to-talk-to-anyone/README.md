# how-to-talk-to-anyone

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/how-to-talk-to-anyone.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | `out/thumbnail-how-to-talk-to-anyone.png` _(yok)_ | YouTube kapak |
| 📝 YouTube pack | `books/how-to-talk-to-anyone/youtube.md` _(yok)_ | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | `public/captions/how-to-talk-to-anyone.clean.vtt` _(yok)_ | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/how-to-talk-to-anyone.vtt`](../../public/captions/how-to-talk-to-anyone.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | `public/audio/how-to-talk-to-anyone.m4a` _(yok)_ | NotebookLM sesi |
| 🖼️ Scene images | `public/scenes/how-to-talk-to-anyone/` _(yok)_ | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/how-to-talk-to-anyone/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/how-to-talk-to-anyone/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/how-to-talk-to-anyone/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | `books/how-to-talk-to-anyone/youtube-meta.json` _(yok)_ | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-how-to-talk-to-anyone_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/how-to-talk-to-anyone.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-how-to-talk-to-anyone.png`
4. CC → `how-to-talk-to-anyone.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=how-to-talk-to-anyone --title="how-to-talk-to-anyone"
```
