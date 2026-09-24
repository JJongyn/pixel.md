# Pixel bot avatars

Import `pixel.md/bot` to use `<pixel-bot-avatar>`. The avatar is a small pixel character for an agent list, chat byline, task handoff, or active assistant badge. It shows identity and activity; the host app remains responsible for agent behavior.

```html
<pixel-bot-avatar variant="mote" state="working" label="Research assistant" size="medium"></pixel-bot-avatar>
```

| Variant | Character role | Component guide |
| --- | --- | --- |
| `mote` | San · lopsided pebble with mismatched eyes. | [San](components/bots/mote.md) |
| `sprout` | Woni · small sprout ears and a shy face. | [Woni](components/bots/sprout.md) |
| `spark` | Duri · pointed head and dangling legs. | [Duri](components/bots/spark.md) |
| `wisp` | Bomi · soft ghost with uneven fringe. | [Bomi](components/bots/wisp.md) |
| `gear` | Taeo · little antenna and blocky body. | [Taeo](components/bots/gear.md) |
| `comet` | Nari · asymmetrical, forward-leaning body. | [Nari](components/bots/comet.md) |
| `prism` | Haru · compact triangular shape. | [Haru](components/bots/prism.md) |
| `kernel` | Mino · squat square with mismatched eyes. | [Mino](components/bots/kernel.md) |

`state` accepts `idle`, `thinking`, `working`, `speaking`, `success`, and `sleeping`. Each state has whole-body motion plus a face reaction. `size` accepts `small`, `medium`, or `large`. `label` supplies the accessible character name; omit it to use the default name above. Set `paused` to stop animation. CSS properties `--pixel-bot-color` and `--pixel-bot-accent` customize the main colors. Animation pauses when the avatar is offscreen or the page is hidden, and respects reduced motion.
