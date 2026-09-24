---
name: pixel-md-indicator
description: Add pixel.md agent activity indicators to a web app. Use when an AI chat or agent interface needs compact thinking, searching, browsing, reading, planning, acting, tool, building, verifying, or responding states.
---

# pixel.md indicator

Use the browser-native `<pixel-agent-status>` component for an agent's current work. Import `pixel.md/indicator` in the client entry point; if using this repository before npm publication, install its `pixel.md` package folder locally first.

```js
import 'pixel.md/indicator';
```

```html
<pixel-agent-status state="thinking" label="Thinking…" detail="Finding an approach"></pixel-agent-status>
```

Map real application state to one of `thinking`, `searching`, `browsing`, `reading`, `planning`, `acting`, `tool`, `building`, `verifying`, or `responding`. Update `state`, `label`, and `detail` on the existing element as the work changes. Use concise task-specific labels; the indicator only displays state and does not perform agent work.

Use `compact` in a dense chat turn and `size="large"` only when the layout has room. Add `announce` when a status change should be spoken by assistive technology; avoid duplicate announcements if nearby text already provides one. The component respects reduced-motion settings. Set `--pixel-ink`, `--pixel-muted`, and `--pixel-accent` on the element to match the app's palette.

The package README contains the complete attribute list. Do not recreate the animation with generic spinners or add a large decorative container around the status unless the product design calls for one.
