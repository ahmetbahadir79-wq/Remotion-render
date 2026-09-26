# All the Light We Cannot See — Anthony Doerr  ·  _historical-fiction_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/all-the-light-we-cannot-see.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-all-the-light-we-cannot-see.png`](../../out/thumbnail-all-the-light-we-cannot-see.png) | YouTube kapak |
| 📝 YouTube pack | [`books/all-the-light-we-cannot-see/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/all-the-light-we-cannot-see.clean.vtt`](../../public/captions/all-the-light-we-cannot-see.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/all-the-light-we-cannot-see.vtt`](../../public/captions/all-the-light-we-cannot-see.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/all-the-light-we-cannot-see.m4a`](../../public/audio/all-the-light-we-cannot-see.m4a) | NotebookLM sesi |
| 🖼️ Scene images | [`public/scenes/all-the-light-we-cannot-see/`](../../public/scenes/all-the-light-we-cannot-see) | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/all-the-light-we-cannot-see/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/all-the-light-we-cannot-see/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | [`books/all-the-light-we-cannot-see/config.vox.json`](config.vox.json) | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/all-the-light-we-cannot-see/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-all-the-light-we-cannot-see_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/all-the-light-we-cannot-see.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-all-the-light-we-cannot-see.png`
4. CC → `all-the-light-we-cannot-see.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=all-the-light-we-cannot-see --title="All the Light We Cannot See" --author="Anthony Doerr" --genre=historical-fiction
```
