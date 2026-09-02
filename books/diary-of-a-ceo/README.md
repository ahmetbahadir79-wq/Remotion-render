# The Diary of a CEO: The 33 Laws of Business and Life — Steven Bartlett  ·  _business_

> Bu kitabın **hub klasörü**. Tüm dosyalara buradan ulaş. Makine-JSON'ları (vox-config, youtube-meta) pipeline'a gömülü olduğu için **kökte** durur — aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/diary-of-a-ceo.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-diary-of-a-ceo.png`](../../out/thumbnail-diary-of-a-ceo.png) | YouTube kapak |
| 📝 YouTube pack | [`books/diary-of-a-ceo/youtube.md`](../../books/diary-of-a-ceo/youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/diary-of-a-ceo.clean.vtt`](../../public/captions/diary-of-a-ceo.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/diary-of-a-ceo.vtt`](../../public/captions/diary-of-a-ceo.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/diary-of-a-ceo.m4a`](../../public/audio/diary-of-a-ceo.m4a) | NotebookLM sesi |
| 🖼️ Scene images | [`public/scenes/diary-of-a-ceo/`](../../public/scenes/diary-of-a-ceo/) | Flux görselleri |
| ✍️ NotebookLM prompt | [`prompts/notebooklm-prompt.diary-of-a-ceo.md`](../../prompts/notebooklm-prompt.diary-of-a-ceo.md) | Doug Stevenson açısı |
| ⚙️ vox-config (makine) | [`vox-config.diary-of-a-ceo.json`](../../vox-config.diary-of-a-ceo.json) | KÖK — pipeline'a gömülü, taşıma |
| ⚙️ youtube-meta (makine) | [`youtube-meta.diary-of-a-ceo.json`](../../youtube-meta.diary-of-a-ceo.json) | KÖK — import-coupled, taşıma |
| 🎞️ Render chunks | `out_Vox-diary-of-a-ceo_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/diary-of-a-ceo.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-diary-of-a-ceo.png`
4. CC → `diary-of-a-ceo.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=diary-of-a-ceo --title="The Diary of a CEO: The 33 Laws of Business and Life" --author="Steven Bartlett" --genre=business
```
