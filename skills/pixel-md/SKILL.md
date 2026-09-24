---
name: pixel-md
description: Select and integrate pixel.md components in AI, agent, and CLI interfaces. Use when adding pixel bot avatars, agent activity states, animated chat input frames, compact workflow UI elements, or terminal UI from this library.
---

# pixel.md

Use the component reference that matches the UI task, then integrate it with the app's real state. Browser components use custom elements; the terminal entry point is a Node.js module for CLI programs.

## Component catalog

| Component | Choose it for | Reference |
| --- | --- | --- |
| Agent status | Show what an AI agent is doing now. | [10 indicator components](references/indicators.md) |
| Chat effect | Add pixel frames or tiny moving scenes around an existing chat composer. | [10 chat effect components](references/chat-effects.md) |
| UI element | Add controls, feedback, context, or workflow details. | [22 UI elements](references/elements.md) |
| Bot avatar | Give an AI agent a compact, expressive pixel character. | [8 bot avatars](references/bots.md) |
| Terminal UI | Add pixel prompts, output, task rails, meters, wave streams, parallel-agent status, approvals, diffs, or sessions. | [14 terminal components](references/terminal.md) |

## Integration

Install the package and import only the entry point needed by the chosen component:

```bash
npm install pixel.md
```

```js
import 'pixel.md/indicator';
// browser: 'pixel.md/chat-effect', 'pixel.md/elements', or 'pixel.md/bot'
// Node CLI: 'pixel.md/terminal'
```

Keep browser components compact and aligned with the host product's theme. Connect displayed state and events to the application's real data and actions. For terminal CLI work, use the ANSI helpers from `pixel.md/terminal`; they format output and collect input but do not execute commands. Do not imply that a visual preview performs network, agent, approval, or business operations by itself. Respect `prefers-reduced-motion` in browser components; avoid replacing an existing input, button, or application workflow.

Each catalog entry links to its own component guide with the exact variant markup and integration note. For current package details and examples, read the repository [README](../../README.md) or the package [README](../../pixel.md/README.md).
