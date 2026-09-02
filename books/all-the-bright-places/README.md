# All the Bright Places — Jennifer Niven  ·  _young-adult_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.
> Meta durumu: **claude-hand-refined** ✓

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | [`out/all-the-bright-places.mp4`](../../out/all-the-bright-places.mp4) | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-all-the-bright-places.png`](../../out/thumbnail-all-the-bright-places.png) | YouTube kapak |
| 📝 YouTube pack | [`books/all-the-bright-places/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/all-the-bright-places.clean.vtt`](../../public/captions/all-the-bright-places.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/all-the-bright-places.vtt`](../../public/captions/all-the-bright-places.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio (master) | [`public/audio/all-the-bright-places.mastered.m4a`](../../public/audio/all-the-bright-places.mastered.m4a) | render edilen ses — loudnorm -14 LUFS |
| 🎙️ Audio (ham) | [`public/audio/all-the-bright-places.m4a`](../../public/audio/all-the-bright-places.m4a) | NotebookLM çıktısı (mastering girdisi) |
| ✍️ NotebookLM prompt | [`books/all-the-bright-places/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/all-the-bright-places/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Antidote config | [`books/all-the-bright-places/config.antidote.json`](config.antidote.json) | render config (sahneler/kinetik metin/altyazı) |
| ⚙️ YouTube meta | [`books/all-the-bright-places/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Antidote-all-the-bright-places_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/all-the-bright-places.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-all-the-bright-places.png`
4. CC → `all-the-bright-places.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=all-the-bright-places --title="All the Bright Places" --author="Jennifer Niven" --genre=young-adult
```
