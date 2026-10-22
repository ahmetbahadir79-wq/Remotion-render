# unlimited-memory

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/unlimited-memory.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | `out/thumbnail-unlimited-memory.png` _(yok)_ | YouTube kapak |
| 📝 YouTube pack | `books/unlimited-memory/youtube.md` _(yok)_ | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | `public/captions/unlimited-memory.clean.vtt` _(yok)_ | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/unlimited-memory.vtt`](../../public/captions/unlimited-memory.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/unlimited-memory.m4a`](../../public/audio/unlimited-memory.m4a) | NotebookLM sesi |
| 🖼️ Scene images | `public/scenes/unlimited-memory/` _(yok)_ | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/unlimited-memory/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/unlimited-memory/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/unlimited-memory/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | `books/unlimited-memory/youtube-meta.json` _(yok)_ | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-unlimited-memory_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/unlimited-memory.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-unlimited-memory.png`
4. CC → `unlimited-memory.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=unlimited-memory --title="unlimited-memory"
```
