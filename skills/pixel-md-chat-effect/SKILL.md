---
name: pixel-md-chat-effect
description: Apply pixel.md animated pixel effects around an existing chat input or card. Use when a web app needs a restrained Orbit, Hop, Anchor, Bevel, Tilt, or Prism frame without replacing its input UI.
---

# pixel.md chat effect

Import `pixel.md/chat-effect` in the browser entry point, then wrap the existing input with `<pixel-chat-effect>`. Preserve that input's behavior, focus handling, accessible name, and submit logic. The effect is visual only.

```js
import 'pixel.md/chat-effect';
```

```html
<pixel-chat-effect variant="orbit">
  <your-existing-chat-input></your-existing-chat-input>
</pixel-chat-effect>
```

Choose the motion that fits the interface: `orbit` for quiet perimeter movement, `hop` for small lower-edge jumps, `anchor` for corner breathing, `bevel` for vertical-axis 3D rotation, `tilt` for horizontal-axis rotation, or `prism` for a restrained diagonal rock. Start with one effect on the primary input. Avoid stacking variants or adding competing glows.

Optional `speed` accepts `0.2` to `3`; `intensity` accepts `0.2` to `1.5`. Use `paused` when the effect should stop. The component pauses when offscreen or the tab is hidden and provides a still frame for reduced-motion users. It does not make an input functional or submit messages.

The package README documents variants and entry points. If the package is only available in this repository, install from its local `pixel.md` folder before using the import.
