# The Happiness Trap — Russ Harris  ·  _psychology_

> Bu kitabın **hub klasörü**. Tüm dosyalara buradan ulaş. Makine-JSON'ları (vox-config, youtube-meta) pipeline'a gömülü olduğu için **kökte** durur — aşağıda linkli.

## Dosyalar

| | Konum | Not |
|---|---|---|
| 🎬 Final video | `out/happiness-trap.mp4` _(yok)_ | render çıktısı |
| 🖼️ Thumbnail | `out/thumbnail-happiness-trap.png` _(yok)_ | YouTube kapak |
| 📝 YouTube pack | [`books/happiness-trap/youtube.md`](../../books/happiness-trap/youtube.md) | başlık/açıklama/tag/bölümler |
| 💬 Captions (CC) | [`public/captions/happiness-trap.clean.vtt`](../../public/captions/happiness-trap.clean.vtt) | YouTube'a "With timing" yükle |
| 💬 Captions (ham) | [`public/captions/happiness-trap.vtt`](../../public/captions/happiness-trap.vtt) | kelime-zamanlı (karaoke kaynağı) |
| 🎙️ Audio | [`public/audio/happiness-trap.m4a`](../../public/audio/happiness-trap.m4a) | NotebookLM sesi |
| 🖼️ Scene images | [`public/scenes/happiness-trap/`](../../public/scenes/happiness-trap/) | Flux görselleri |
| ✍️ NotebookLM prompt | [`prompts/notebooklm-prompt.happiness-trap.md`](../../prompts/notebooklm-prompt.happiness-trap.md) | Doug Stevenson açısı |
| ⚙️ vox-config (makine) | [`vox-config.happiness-trap.json`](../../vox-config.happiness-trap.json) | KÖK — pipeline'a gömülü, taşıma |
| ⚙️ youtube-meta (makine) | [`youtube-meta.happiness-trap.json`](../../youtube-meta.happiness-trap.json) | KÖK — import-coupled, taşıma |
| 🎞️ Render chunks | `out_Vox-happiness-trap_chunks/` _(yok)_ | ara mp4 parçaları + parts.txt |

## Yükleme sırası
1. `out/happiness-trap.mp4` yükle
2. Başlık + açıklama (bölümler tıklanabilir olur) + tag → [youtube.md](youtube.md)
3. Thumbnail → `out/thumbnail-happiness-trap.png`
4. CC → `happiness-trap.clean.vtt` ("With timing")
5. **Altered content = Yes** (sentetik ses)

## Yeniden üretmek
```bash
node scripts/make-book.js --slug=happiness-trap --title="The Happiness Trap" --author="Russ Harris" --genre=psychology
```
