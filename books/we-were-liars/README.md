# We Were Liars — E. Lockhart  ·  _young adult_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.
> Meta durumu: **claude-hand-refined** ✓

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/we-were-liars.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-we-were-liars.png`](../../out/thumbnail-we-were-liars.png) | YouTube kapak |
| 📝 YouTube pack | [`books/we-were-liars/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/we-were-liars.clean.vtt`](../../public/captions/we-were-liars.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/we-were-liars.vtt`](../../public/captions/we-were-liars.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/we-were-liars.m4a`](../../public/audio/we-were-liars.m4a) | NotebookLM sesi |
| 🖼️ Scene images | [`public/scenes/we-were-liars/`](../../public/scenes/we-were-liars) | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/we-were-liars/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/we-were-liars/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/we-were-liars/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/we-were-liars/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-we-were-liars_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/we-were-liars.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-we-were-liars.png`
4. CC → `we-were-liars.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=we-were-liars --title="We Were Liars" --author="E. Lockhart" --genre=young adult
```
