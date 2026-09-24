---
name: pixel-md-chat-effect
description: Add pixel.md animated effects around an existing chat input. Use when an AI chat composer needs a restrained pixel frame, orbit, 3D tilt, car, or cat scene.
---

# pixel.md chat effects

Read [`../pixel-md/references/chat-effects.md`](../pixel-md/references/chat-effects.md) and the relevant component guide before integrating an effect.

```bash
npm install pixel.md
```

```js
import 'pixel.md/chat-effect';
```

```html
<pixel-chat-effect variant="orbit">
  <textarea placeholder="Ask anything…"></textarea>
</pixel-chat-effect>
```

Wrap the app's existing composer; preserve its controlled value, submit behavior, focus handling, and accessible label. Set `variant` from real UI state when using working/idle scenes. Keep effects subtle enough not to compete with messages or controls, and verify reduced-motion behavior.
