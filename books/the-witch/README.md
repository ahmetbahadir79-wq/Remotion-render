# The Witch — Freida McFadden  ·  _thriller_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/the-witch.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-the-witch.png`](../../out/thumbnail-the-witch.png) | YouTube kapak |
| 📝 YouTube pack | [`books/the-witch/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/the-witch.clean.vtt`](../../public/captions/the-witch.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/the-witch.vtt`](../../public/captions/the-witch.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | `public/audio/the-witch.m4a` _(yok)_ | NotebookLM sesi |
| 🖼️ Scene images | [`public/scenes/the-witch/`](../../public/scenes/the-witch) | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/the-witch/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/the-witch/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | [`books/the-witch/config.vox.json`](config.vox.json) | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/the-witch/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-the-witch_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/the-witch.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-the-witch.png`
4. CC → `the-witch.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=the-witch --title="The Witch" --author="Freida McFadden" --genre=thriller
```
