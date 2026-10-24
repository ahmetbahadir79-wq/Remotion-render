# do-over-rescue-monday-reinvent-your-work-and-never-get-stuck

> Bu kitabın **hub klasörü**. Kitaba dair her şey (config, meta, prompt, upload pack) burada; render çıktıları `public/` ve `out/` altında, aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/do-over-rescue-monday-reinvent-your-work-and-never-get-stuck.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | `out/thumbnail-do-over-rescue-monday-reinvent-your-work-and-never-get-stuck.png` _(yok)_ | YouTube kapak |
| 📝 YouTube pack | `books/do-over-rescue-monday-reinvent-your-work-and-never-get-stuck/youtube.md` _(yok)_ | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | `public/captions/do-over-rescue-monday-reinvent-your-work-and-never-get-stuck.clean.vtt` _(yok)_ | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/do-over-rescue-monday-reinvent-your-work-and-never-get-stuck.vtt`](../../public/captions/do-over-rescue-monday-reinvent-your-work-and-never-get-stuck.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/do-over-rescue-monday-reinvent-your-work-and-never-get-stuck.m4a`](../../public/audio/do-over-rescue-monday-reinvent-your-work-and-never-get-stuck.m4a) | NotebookLM sesi |
| 🖼️ Scene images | `public/scenes/do-over-rescue-monday-reinvent-your-work-and-never-get-stuck/` _(yok)_ | Flux görselleri |
| ✍️ NotebookLM prompt | [`books/do-over-rescue-monday-reinvent-your-work-and-never-get-stuck/prompt.notebooklm.md`](prompt.notebooklm.md) | orijinal analiz açısı |
| 📖 Manifest | [`books/do-over-rescue-monday-reinvent-your-work-and-never-get-stuck/book.json`](book.json) | book.json (slug/başlık/engine) |
| ⚙️ Vox config | `books/do-over-rescue-monday-reinvent-your-work-and-never-get-stuck/config.vox.json` _(yok)_ | render config (beats/captions) |
| ⚙️ YouTube meta | `books/do-over-rescue-monday-reinvent-your-work-and-never-get-stuck/youtube-meta.json` _(yok)_ | SEO/meta + thumbnail brief |
| 🎞️ Render chunks | `out_Vox-do-over-rescue-monday-reinvent-your-work-and-never-get-stuck_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/do-over-rescue-monday-reinvent-your-work-and-never-get-stuck.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-do-over-rescue-monday-reinvent-your-work-and-never-get-stuck.png`
4. CC → `do-over-rescue-monday-reinvent-your-work-and-never-get-stuck.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=do-over-rescue-monday-reinvent-your-work-and-never-get-stuck --title="do-over-rescue-monday-reinvent-your-work-and-never-get-stuck"
```
