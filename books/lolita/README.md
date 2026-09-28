# Lolita — Vladimir Nabokov  ·  _classics_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/lolita.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-lolita.png`](../../out/thumbnail-lolita.png) | YouTube kapak |
| 📝 YouTube pack | [`books/lolita/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/lolita.clean.vtt`](../../public/captions/lolita.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/lolita.vtt`](../../public/captions/lolita.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/lolita.m4a`](../../public/audio/lolita.m4a) | NotebookLM sesi |
| 🖼️ Scene images | `public/scenes/lolita/` _(yok)_ | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/lolita/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/lolita/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/lolita/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/lolita/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-lolita_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/lolita.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-lolita.png`
4. CC → `lolita.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=lolita --title="Lolita" --author="Vladimir Nabokov" --genre=classics
```
