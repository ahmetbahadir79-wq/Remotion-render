# The War of the Worlds — H.G. Wells  ·  _science-fiction_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/war-of-the-worlds.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-war-of-the-worlds.png`](../../out/thumbnail-war-of-the-worlds.png) | YouTube kapak |
| 📝 YouTube pack | [`books/war-of-the-worlds/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/war-of-the-worlds.clean.vtt`](../../public/captions/war-of-the-worlds.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/war-of-the-worlds.vtt`](../../public/captions/war-of-the-worlds.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/war-of-the-worlds.m4a`](../../public/audio/war-of-the-worlds.m4a) | NotebookLM sesi |
| 🖼️ Scene images | [`public/scenes/war-of-the-worlds/`](../../public/scenes/war-of-the-worlds) | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/war-of-the-worlds/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/war-of-the-worlds/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | [`books/war-of-the-worlds/config.vox.json`](config.vox.json) | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/war-of-the-worlds/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-war-of-the-worlds_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/war-of-the-worlds.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-war-of-the-worlds.png`
4. CC → `war-of-the-worlds.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=war-of-the-worlds --title="The War of the Worlds" --author="H.G. Wells" --genre=science-fiction
```
