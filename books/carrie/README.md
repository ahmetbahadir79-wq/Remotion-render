# carrie

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/carrie.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | `out/thumbnail-carrie.png` _(yok)_ | YouTube kapak |
| 📝 YouTube pack | `books/carrie/youtube.md` _(yok)_ | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | `public/captions/carrie.clean.vtt` _(yok)_ | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/carrie.vtt`](../../public/captions/carrie.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | `public/audio/carrie.m4a` _(yok)_ | NotebookLM sesi |
| 🖼️ Scene images | `public/scenes/carrie/` _(yok)_ | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/carrie/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/carrie/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/carrie/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | `books/carrie/youtube-meta.json` _(yok)_ | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-carrie_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/carrie.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-carrie.png`
4. CC → `carrie.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=carrie --title="carrie"
```
