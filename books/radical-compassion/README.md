# radical-compassion

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/radical-compassion.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | `out/thumbnail-radical-compassion.png` _(yok)_ | YouTube kapak |
| 📝 YouTube pack | `books/radical-compassion/youtube.md` _(yok)_ | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | `public/captions/radical-compassion.clean.vtt` _(yok)_ | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/radical-compassion.vtt`](../../public/captions/radical-compassion.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | `public/audio/radical-compassion.m4a` _(yok)_ | NotebookLM sesi |
| 🖼️ Scene images | `public/scenes/radical-compassion/` _(yok)_ | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/radical-compassion/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/radical-compassion/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/radical-compassion/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | `books/radical-compassion/youtube-meta.json` _(yok)_ | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-radical-compassion_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/radical-compassion.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-radical-compassion.png`
4. CC → `radical-compassion.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=radical-compassion --title="radical-compassion"
```
