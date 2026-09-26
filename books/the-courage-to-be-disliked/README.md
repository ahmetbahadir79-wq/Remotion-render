# The Courage to Be Disliked — Ichiro Kishimi, Fumitake Koga  ·  _self-help_

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/the-courage-to-be-disliked.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-the-courage-to-be-disliked.png`](../../out/thumbnail-the-courage-to-be-disliked.png) | YouTube kapak |
| 📝 YouTube pack | [`books/the-courage-to-be-disliked/youtube.md`](youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/the-courage-to-be-disliked.clean.vtt`](../../public/captions/the-courage-to-be-disliked.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/the-courage-to-be-disliked.vtt`](../../public/captions/the-courage-to-be-disliked.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/the-courage-to-be-disliked.m4a`](../../public/audio/the-courage-to-be-disliked.m4a) | NotebookLM sesi |
| 🖼️ Scene images | `public/scenes/the-courage-to-be-disliked/` _(yok)_ | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/the-courage-to-be-disliked/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/the-courage-to-be-disliked/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/the-courage-to-be-disliked/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | [`books/the-courage-to-be-disliked/youtube-meta.json`](youtube-meta.json) | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-the-courage-to-be-disliked_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/the-courage-to-be-disliked.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-the-courage-to-be-disliked.png`
4. CC → `the-courage-to-be-disliked.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=the-courage-to-be-disliked --title="The Courage to Be Disliked" --author="Ichiro Kishimi, Fumitake Koga" --genre=self-help
```
