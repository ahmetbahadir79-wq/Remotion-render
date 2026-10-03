# don-t-believe-everything-you-think

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/don-t-believe-everything-you-think.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | `out/thumbnail-don-t-believe-everything-you-think.png` _(yok)_ | YouTube kapak |
| 📝 YouTube pack | `books/don-t-believe-everything-you-think/youtube.md` _(yok)_ | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | `public/captions/don-t-believe-everything-you-think.clean.vtt` _(yok)_ | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/don-t-believe-everything-you-think.vtt`](../../public/captions/don-t-believe-everything-you-think.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/don-t-believe-everything-you-think.m4a`](../../public/audio/don-t-believe-everything-you-think.m4a) | NotebookLM sesi |
| 🖼️ Scene images | `public/scenes/don-t-believe-everything-you-think/` _(yok)_ | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/don-t-believe-everything-you-think/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/don-t-believe-everything-you-think/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/don-t-believe-everything-you-think/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | `books/don-t-believe-everything-you-think/youtube-meta.json` _(yok)_ | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-don-t-believe-everything-you-think_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/don-t-believe-everything-you-think.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-don-t-believe-everything-you-think.png`
4. CC → `don-t-believe-everything-you-think.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=don-t-believe-everything-you-think --title="don-t-believe-everything-you-think"
```
