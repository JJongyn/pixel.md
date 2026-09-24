---
name: pixel-md-indicator
description: Add pixel.md activity indicators to AI and agent interfaces. Use when an agent needs clear thinking, searching, browsing, reading, planning, acting, tool, building, verifying, or responding states.
---

# pixel.md agent indicators

Choose the indicator state that reflects the agent's real current operation. Read [`../pixel-md/references/indicators.md`](../pixel-md/references/indicators.md) for the state catalog and component-specific references before editing the app.

```bash
npm install pixel.md
```

```js
import 'pixel.md/indicator';
```

```html
<pixel-agent-status state="thinking" label="Thinking…" detail="Connecting ideas"></pixel-agent-status>
```

Bind `state`, `label`, and optional `detail` to the host application's actual agent state. Keep the indicator compact, use `announce` only when assistive technology needs a status announcement, and respect the component's reduced-motion behavior. Do not imply that the indicator performs the operation it describes.
