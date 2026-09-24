# pixel.md

<p align="center">
  <strong>Small pixel details for AI interfaces.</strong><br />
  Activity indicators, chat effects, agent UI, pixel bots, and terminal components.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/pixel.md"><img alt="npm version" src="https://img.shields.io/npm/v/pixel.md?logo=npm&label=npm" /></a>
  <a href="https://www.npmjs.com/package/pixel.md"><img alt="npm downloads" src="https://img.shields.io/npm/dm/pixel.md?label=downloads" /></a>
  <a href="LICENSE"><img alt="MIT license" src="https://img.shields.io/badge/license-MIT-blue.svg" /></a>
  <a href="https://github.com/JJongyn/pixel.md/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/JJongyn/pixel.md?style=social" /></a>
  <a href="https://jjongyn.github.io/pixel.md/"><img alt="Live gallery" src="https://img.shields.io/badge/demo-live%20gallery-355c43" /></a>
</p>

![pixel.md component preview](https://raw.githubusercontent.com/JJongyn/pixel.md/main/pixel.md/assets/overview.png)

pixel.md is a small, dependency-free UI library for AI and agent products. Add a quiet pixel signal to an existing chat, expose what an agent is doing, or give a terminal CLI a consistent visual language.

The browser components are native Custom Elements, so they work in plain JavaScript and frameworks that support web components. The terminal helpers are a separate Node.js entry point.

## Install

```bash
npm install pixel.md
```

## Quick start

Import only the browser components your app uses:

```js
import 'pixel.md/indicator';
import 'pixel.md/chat-effect';
```

```html
<pixel-agent-status
  state="thinking"
  label="Thinking…"
  detail="Connecting ideas"
></pixel-agent-status>

<pixel-chat-effect variant="orbit">
  <textarea placeholder="Ask anything…"></textarea>
</pixel-chat-effect>
```

`<pixel-chat-effect>` adds an animated pixel treatment around your input; your app keeps control of the textarea, messages, and send behavior. Change the indicator's `state`, `label`, or `detail` attributes as your agent moves through its workflow.

## Components

| Import | Element or API | Includes |
| --- | --- | --- |
| `pixel.md/indicator` | `<pixel-agent-status>` | Thinking, searching, browsing, reading, planning, acting, tool, building, verifying, and responding states |
| `pixel.md/chat-effect` | `<pixel-chat-effect>` | Orbit, Hop, Anchor, Bevel, Tilt, Prism, Car, and Cat effects, with idle and working states |
| `pixel.md/elements` | `<pixel-ui-element>` | Compact workflow controls for progress, approvals, sources, retries, streaming, handoff, and more |
| `pixel.md/bot` | `<pixel-bot-avatar>` | Eight animated pixel characters with configurable states and labels |
| `pixel.md/terminal` | Node.js functions | ANSI-friendly prompts, progress, output, task lists, confirmations, and more |
| `pixel.md/terminal-preview` | `<pixel-terminal>` | Browser preview of fourteen terminal patterns |

Import `pixel.md` to register all four browser elements at once, or use the individual subpaths above to keep imports explicit.

## Connect real agent state

Keep component state tied to the state machine in your app:

```js
const status = document.querySelector('pixel-agent-status');

function setAgentState(state, detail) {
  status.setAttribute('state', state);
  status.setAttribute('detail', detail);
}

setAgentState('searching', 'Looking through project files');
```

Workflow elements emit a bubbling `pixel-element-change` event so your app can handle interactions:

```js
document.querySelector('pixel-ui-element').addEventListener(
  'pixel-element-change',
  event => {
    console.log(event.detail.variant, event.detail.state);
  }
);
```

See the [package guide](pixel.md/README.md) for variants, attributes, events, styling hooks, TypeScript declarations, and framework notes.

## Terminal CLI

Use the Node.js entry point for terminal output and prompts. It has no runtime dependencies, respects `NO_COLOR`, and falls back to plain text when output is piped.

```js
import { askPixelCommand, pixelOutput } from 'pixel.md/terminal';

const command = await askPixelCommand({ cwd: '~/project' });

// Validate the input before passing it to your own command runner.
if (command) {
  console.log(pixelOutput({
    command,
    lines: ['Build complete'],
    status: 'success',
    duration: '1.8s'
  }));
}
```

The terminal helpers format output and collect input; they do not execute shell commands. Your CLI remains responsible for validation and execution.

## Design principles

- **Small by default.** Pixel motion is a detail around the interface, not a replacement for it.
- **Bring your own UI.** Chat effects wrap existing inputs; they do not take over application state or interaction.
- **Native browser elements.** No React runtime or component framework is required.
- **Motion with care.** Animated browser components pause when hidden or offscreen and honor `prefers-reduced-motion`.
- **Useful in a terminal.** CLI output supports ANSI color, piped output, and `NO_COLOR`.
- **No runtime dependencies.** Browser elements and CLI helpers use platform APIs.

## Agent skills

The package includes the [`pixel-md` skill](pixel.md/skills/pixel-md/SKILL.md), with component-specific references for indicators, chat effects, UI elements, bots, and terminal patterns. To add it to a project:

```bash
mkdir -p .agents/skills
cp -R node_modules/pixel.md/skills/pixel-md .agents/skills/
```

For Claude Code, copy the same folder to `.claude/skills/` instead. The skill is optional; the components work without it.

## Live gallery

Browse and try the components at **[jjongyn.github.io/pixel.md](https://jjongyn.github.io/pixel.md/)**. To run the gallery from a checkout:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173/`.

## Contributing

Bug reports, ideas, and pull requests are welcome. Please include the component or entry point involved and a short reproduction when reporting a problem.

- [Open an issue](https://github.com/JJongyn/pixel.md/issues)
- [Browse the source](https://github.com/JJongyn/pixel.md)

## License

[MIT](LICENSE) © 2026 JJongyn
