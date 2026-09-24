# Agent status indicators

Import `pixel.md/indicator`. Use one `<pixel-agent-status>` and update its attributes as the agent changes state. Labels should describe the current real operation; `detail` is optional supporting context.

```html
<pixel-agent-status state="thinking" label="Thinking…" detail="Finding an approach"></pixel-agent-status>
```

| State | Use for | Component guide |
| --- | --- | --- |
| `thinking` | Reasoning or deciding the next action. | [Thinking](components/indicators/thinking.md) |
| `searching` | Searching indexed knowledge or sources. | [Searching](components/indicators/searching.md) |
| `browsing` | Navigating pages or web resources. | [Browsing](components/indicators/browsing.md) |
| `reading` | Reading a document, page, or provided context. | [Reading](components/indicators/reading.md) |
| `planning` | Choosing or ordering upcoming steps. | [Planning](components/indicators/planning.md) |
| `acting` | Carrying out a user-visible action. | [Acting](components/indicators/acting.md) |
| `tool` | Calling or waiting on an external tool. | [Using tool](components/indicators/tool.md) |
| `building` | Creating or assembling an output. | [Building](components/indicators/building.md) |
| `verifying` | Checking a result before presenting it. | [Verifying](components/indicators/verifying.md) |
| `responding` | Delivering the final answer. | [Responding](components/indicators/responding.md) |

Change `state`, `label`, and `detail` on the same element as work progresses. `compact` suits dense chat turns; `size="large"` is for spacious status panels. Add `announce` only when a status change needs assistive announcement and nearby text does not already announce it. The animation respects reduced-motion preferences. Theme with `--pixel-ink`, `--pixel-muted`, and `--pixel-accent`.
