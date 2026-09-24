# pixel.md

![pixel.md component overview](assets/overview.png)

Small pixel components for AI and agent interfaces. Three browser-native Web Components, no runtime dependencies, and no build step inside the package.

## Install

From this repository, before the npm release:

```bash
npm install ./pixel.md
```

After the package is published to npm:

```bash
npm install pixel.md
```

Import only what you use in your app's browser entry point:

```js
import 'pixel.md/indicator';
import 'pixel.md/chat-effect';
import 'pixel.md/elements';
```

`import 'pixel.md'` registers all three. Each module defines its custom element once. You can use the package in a vanilla JavaScript app or any framework that renders custom elements. Rendering does not require React.

## Indicator

```html
<pixel-agent-status
  state="thinking"
  label="Thinking…"
  detail="Connecting ideas"
></pixel-agent-status>
```

`state`: `thinking`, `searching`, `browsing`, `reading`, `planning`, `acting`, `tool`, `building`, `verifying`, `responding`. Change `state`, `label`, and `detail` attributes as the agent works. Optional attributes: `compact`, `size="large"`, `theme="dark"`, `announce`, `paused`.

Customize color with `--pixel-ink`, `--pixel-muted`, and `--pixel-accent` on the element. Motion respects `prefers-reduced-motion`.

## Chat effect

```html
<pixel-chat-effect variant="orbit" speed="1" intensity="1">
  <textarea placeholder="Ask anything…"></textarea>
</pixel-chat-effect>
```

The effect wraps your existing input; it does not replace or style it. Variants: `orbit`, `hop`, `anchor`, `bevel`, `tilt`, `prism`. `speed` accepts `0.2`–`3`, and `intensity` accepts `0.2`–`1.5`. Add `paused` to stop motion. The canvas pauses when offscreen or the tab is hidden, and provides a still frame for reduced-motion users.

## UI elements

```html
<pixel-ui-element variant="progress" label="Indexing workspace" value="62"></pixel-ui-element>
```

Variants: `toggle`, `count`, `toast`, `tabs`, `check`, `reveal`, `progress`, `sources`, `retry`, `feedback`, `copy`, `file`, `queue`, `approval`, `stream`, `handoff`, `branch`, `usage`, `steps`.

Most controls work in the preview immediately. For app integration, listen for the event and update your application state:

```js
document.querySelector('pixel-ui-element').addEventListener('pixel-element-change', event => {
  console.log(event.detail.variant, event.detail.state);
});
```

The event bubbles through Shadow DOM. `label` sets the visible name on supported variants; `value` initializes `count`, `progress`, or `usage`; `text` supplies content for `copy` or `stream`. `items` accepts a JSON array of one to five strings or `{ "label": "...", "detail": "..." }` objects for `tabs`, `sources`, `queue`, `branch`, and `steps`.

## Entry points

| Import | Registers |
| --- | --- |
| `pixel.md` | All three components |
| `pixel.md/indicator` | `<pixel-agent-status>` |
| `pixel.md/chat-effect` | `<pixel-chat-effect>` |
| `pixel.md/elements` | `<pixel-ui-element>` |

The JavaScript modules and TypeScript declarations are included in the package. The gallery at the repository root loads these same source modules.

## For a coding agent

Copy this into your coding assistant after adding the package to your project:

> Add `pixel.md` to this app. Import only the component entry points we use (`pixel.md/indicator`, `pixel.md/chat-effect`, or `pixel.md/elements`). Use `<pixel-agent-status>` for agent activity, wrap the existing chat input with `<pixel-chat-effect>` without replacing that input, and connect `<pixel-ui-element>` to app state through `pixel-element-change`. Match the existing theme and keep the components compact.

## Agent skills

This package includes three standard `SKILL.md` folders:

| Skill | Focus |
| --- | --- |
| [`pixel-md-indicator`](skills/pixel-md-indicator/SKILL.md) | Agent status mapping, labels, and motion. |
| [`pixel-md-chat-effect`](skills/pixel-md-chat-effect/SKILL.md) | Pixel motion around an existing input. |
| [`pixel-md-elements`](skills/pixel-md-elements/SKILL.md) | Interactive agent controls and `pixel-element-change` events. |

Install a skill into a project after installing the package:

```bash
mkdir -p .agents/skills
cp -R node_modules/pixel.md/skills/pixel-md-indicator .agents/skills/
```

Replace the skill folder name for Chat effects or Elements. For Claude Code, use `.claude/skills/` as the destination. The skills are optional; the components work without them.

## Browser-only rendering

Imports are safe to evaluate during server rendering, but custom elements register only in a browser. Render the tags on the client and attach `pixel-element-change` listeners there. In a plain HTML site without an npm bundler, import the three files from `src/` with relative URLs instead.

## License

The distribution license has not been selected yet. The package is marked `UNLICENSED` until that decision is made; no npm release should use this placeholder.
