# The Odyssey — Homer  ·  _classics_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.
> Meta durumu: **claude-hand-refined** ✓

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/the-odyssey.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-the-odyssey.png`](../../out/thumbnail-the-odyssey.png) | YouTube kapak |
| 📝 YouTube pack | [`books/the-odyssey/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/the-odyssey.clean.vtt`](../../public/captions/the-odyssey.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/the-odyssey.vtt`](../../public/captions/the-odyssey.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/the-odyssey.m4a`](../../public/audio/the-odyssey.m4a) | NotebookLM sesi |
| 🖼️ Scene images | [`public/scenes/the-odyssey/`](../../public/scenes/the-odyssey) | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/the-odyssey/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/the-odyssey/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | [`books/the-odyssey/config.vox.json`](config.vox.json) | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/the-odyssey/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-the-odyssey_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/the-odyssey.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-the-odyssey.png`
4. CC → `the-odyssey.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=the-odyssey --title="The Odyssey" --author="Homer" --genre=classics
```
