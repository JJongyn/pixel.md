---
name: pixel-md-elements
description: Add pixel.md workflow elements to AI and agent interfaces. Use for compact progress, approval, citations, retries, feedback, streaming, handoff, and other agent workflow controls.
---

# pixel.md workflow elements

Read [`../pixel-md/references/elements.md`](../pixel-md/references/elements.md) and the component-specific guide for the UI element you need.

```bash
npm install pixel.md
```

```js
import 'pixel.md/elements';

document.querySelector('pixel-ui-element').addEventListener('pixel-element-change', event => {
  // Update the owning application's real state here.
  console.log(event.detail.variant, event.detail.state);
});
```

```html
<pixel-ui-element variant="progress" label="Indexing workspace" value="62"></pixel-ui-element>
```

Use elements to expose genuine workflow state and connect interactions to the host application's handlers. Keep authorization, retry, and handoff decisions in the app; a component is a UI affordance and does not perform the underlying operation on its own.
