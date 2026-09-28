# Unhinged — Steph Macca  ·  _dark-romance_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/unhinged.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-unhinged.png`](../../out/thumbnail-unhinged.png) | YouTube kapak |
| 📝 YouTube pack | [`books/unhinged/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/unhinged.clean.vtt`](../../public/captions/unhinged.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/unhinged.vtt`](../../public/captions/unhinged.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/unhinged.m4a`](../../public/audio/unhinged.m4a) | NotebookLM sesi |
| 🖼️ Scene images | `public/scenes/unhinged/` _(yok)_ | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/unhinged/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/unhinged/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/unhinged/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/unhinged/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-unhinged_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/unhinged.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-unhinged.png`
4. CC → `unhinged.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=unhinged --title="Unhinged" --author="Steph Macca" --genre=dark-romance
```
