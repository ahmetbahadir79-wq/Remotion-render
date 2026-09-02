# The Righteous Mind — Jonathan Haidt  ·  _psychology_

> Bu kitabın **hub klasörü**. Tüm dosyalara buradan ulaş. Makine-JSON'ları (vox-config, youtube-meta) pipeline'a gömülü olduğu için **kökte** durur — aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/the-righteous-mind.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | [`out/thumbnail-the-righteous-mind.png`](../../out/thumbnail-the-righteous-mind.png) | YouTube kapak |
| 📝 YouTube pack | [`books/the-righteous-mind/youtube.md`](../../books/the-righteous-mind/youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/the-righteous-mind.clean.vtt`](../../public/captions/the-righteous-mind.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/the-righteous-mind.vtt`](../../public/captions/the-righteous-mind.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/the-righteous-mind.m4a`](../../public/audio/the-righteous-mind.m4a) | NotebookLM sesi |
| 🖼️ Scene images | [`public/scenes/the-righteous-mind/`](../../public/scenes/the-righteous-mind/) | Flux görselleri |
| ✍️ NotebookLM prompt | [`prompts/notebooklm-prompt.the-righteous-mind.md`](../../prompts/notebooklm-prompt.the-righteous-mind.md) | Doug Stevenson açısı |
| ⚙️ vox-config (makine) | [`vox-config.the-righteous-mind.json`](../../vox-config.the-righteous-mind.json) | KÖK — pipeline'a gömülü, taşıma |
| ⚙️ youtube-meta (makine) | [`youtube-meta.the-righteous-mind.json`](../../youtube-meta.the-righteous-mind.json) | KÖK — import-coupled, taşıma |
| 🎞️ Render chunks | `out_Vox-the-righteous-mind_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/the-righteous-mind.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-the-righteous-mind.png`
4. CC → `the-righteous-mind.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=the-righteous-mind --title="The Righteous Mind" --author="Jonathan Haidt" --genre=psychology
```
