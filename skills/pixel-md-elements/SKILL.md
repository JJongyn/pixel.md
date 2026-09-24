---
name: pixel-md-elements
description: Add pixel.md interactive UI elements to an AI or agent web app. Use for compact controls, progress, citations, approval, retry, feedback, tool handoff, and other agent workflow details.
---

# pixel.md elements

Import `pixel.md/elements` in the browser entry point. Render `<pixel-ui-element>` with the variant that matches the actual product state or action.

```js
import 'pixel.md/elements';
```

```html
<pixel-ui-element variant="progress" label="Indexing workspace" value="62"></pixel-ui-element>
```

Available variants are `toggle`, `count`, `toast`, `tabs`, `check`, `reveal`, `progress`, `sources`, `retry`, `feedback`, `copy`, `file`, `queue`, `approval`, `stream`, `handoff`, `branch`, `usage`, and `steps`. Prefer one focused element at the point of interaction. Use `label` for a meaningful visible name, `value` for count or percentage values, and `text` for copy or stream content. For `tabs`, `sources`, `queue`, `branch`, and `steps`, `items` accepts a JSON array of one to five strings or objects with `label` and optional `detail`.

Connect UI actions to application logic through the bubbling `pixel-element-change` event. Read `event.detail.variant` and `event.detail.state`. Approval, retry, handoff, and progress previews do not perform network or business operations on their own; the app must handle those operations and update the component's attributes.

```js
document.querySelector('pixel-ui-element').addEventListener('pixel-element-change', event => {
  const { variant, state } = event.detail;
  // Connect this UI state to the app's own action or data.
});
```

The package README contains the attribute and variant reference. Keep the element compact and aligned with the surrounding interface; its pixel accents should communicate state rather than become background decoration.
