# pixel.md

![pixel.md component overview](pixel.md/assets/overview.png)

A small pixel UI library for AI and agent interfaces. Explore the [live gallery](index.html) to preview all 35 states, effects, and elements. The gallery loads the same files that ship in the package.

## Package

The npm-ready package lives in [`pixel.md/`](pixel.md/). Until it is published, install it from this checkout:

```bash
npm install ./pixel.md
```

Then import the components you need:

```js
import 'pixel.md/indicator';
import 'pixel.md/chat-effect';
import 'pixel.md/elements';
```

```html
<pixel-agent-status state="thinking" label="Thinking…"></pixel-agent-status>
<pixel-chat-effect variant="orbit"><textarea placeholder="Ask anything…"></textarea></pixel-chat-effect>
<pixel-ui-element variant="retry"></pixel-ui-element>
```

See the [package README](pixel.md/README.md) for variants, attributes, events, TypeScript types, and framework guidance.

## Agent skills

The three reusable skills live in [`skills/`](skills/):

| Skill | Use |
| --- | --- |
| [`pixel-md-indicator`](skills/pixel-md-indicator/SKILL.md) | Connect real agent states to the pixel indicator. |
| [`pixel-md-chat-effect`](skills/pixel-md-chat-effect/SKILL.md) | Wrap an existing chat input with a restrained pixel effect. |
| [`pixel-md-elements`](skills/pixel-md-elements/SKILL.md) | Add interactive workflow elements and connect their events. |

This repository exposes them through `.agents/skills/` and `.claude/skills/`. The package also includes copies of the same skills. In another project, copy a desired folder from `node_modules/pixel.md/skills/` into `.agents/skills/` or `.claude/skills/`.

## Gallery

Run `python3 -m http.server 4173` in this directory, then open `http://127.0.0.1:4173/`. The gallery is a static site; no build step is needed. Its Chat effects previews use a plain text area so the effect itself remains the focus. The optional `pixel.md/examples/pixel-chat-composer.js` is not included in the package.

## Release status

The folder is prepared for npm publishing under the requested name `pixel.md`. The license decision is pending, so it is currently marked `UNLICENSED` and has not been published.
