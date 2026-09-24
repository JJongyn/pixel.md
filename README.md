# pixel.md

![pixel.md component overview](pixel.md/assets/overview.png)

A small pixel UI library for AI, agent, and CLI interfaces. Explore the [live gallery](index.html) to preview agent states, chat effects, workflow elements, pixel bots, and fourteen pixel-native terminal patterns. The gallery loads the same files that ship in the package.

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
import 'pixel.md/bot';
```

```html
<pixel-agent-status state="thinking" label="Thinking…"></pixel-agent-status>
<pixel-chat-effect variant="cat"><textarea placeholder="Ask anything…"></textarea></pixel-chat-effect>
<pixel-ui-element variant="retry"></pixel-ui-element>
<pixel-bot-avatar variant="mote" state="working" label="San"></pixel-bot-avatar>
```

Chat effects include subtle orbiting pixel frames and tiny car and cat scenes that switch between idle and working states. Terminal CLI programs use a Node.js module instead of browser tags:

```js
import { pixelProgress, pixelTaskList } from 'pixel.md/terminal';

console.log(pixelProgress('build', 2, { max: 3 }));
console.log(pixelTaskList(['resolve', 'compile', 'verify'], { active: 1 }));
```

See the [package README](pixel.md/README.md) for variants, attributes, events, TypeScript types, and framework guidance.

## Agent skills

The [`pixel-md` agent skill](skills/pixel-md/SKILL.md) includes a catalog with a dedicated guide for each indicator state, chat effect, UI element, bot avatar, and terminal component. It is discoverable through `.agents/skills/` and `.claude/skills/`, and ships inside the npm package. In another project, copy `node_modules/pixel.md/skills/pixel-md/` into `.agents/skills/pixel-md/` or `.claude/skills/pixel-md/`.

## Gallery

Run `python3 -m http.server 4173` in this directory, then open `http://127.0.0.1:4173/`. The gallery is a static site; no build step is needed. Its Chat effects previews use a plain text area so the effect itself remains the focus. The optional `pixel.md/examples/pixel-chat-composer.js` is not included in the package.

## Release status

The folder is prepared for npm publishing under the requested name `pixel.md`. The license decision is pending, so it is currently marked `UNLICENSED` and has not been published.
