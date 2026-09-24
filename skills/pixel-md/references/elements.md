# Agent workflow UI elements

Import `pixel.md/elements`. Choose the element that fits the actual interaction, then connect its event or attributes to application state. Render a concise example with `<pixel-ui-element variant="progress" label="Indexing workspace" value="62"></pixel-ui-element>`.

| Variant | Use for | Component guide |
| --- | --- | --- |
| `toggle` | Enable or disable a background behavior. | [Toggle](components/elements/toggle.md) |
| `count` | Show a changing count. | [Count](components/elements/count.md) |
| `toast` | Confirm a completed action. | [Toast](components/elements/toast.md) |
| `tabs` | Switch between related views. | [Tabs](components/elements/tabs.md) |
| `check` | Capture a simple approval or completion choice. | [Check](components/elements/check.md) |
| `reveal` | Expand or collapse additional activity detail. | [Reveal](components/elements/reveal.md) |
| `progress` | Show task or workspace progress. | [Progress](components/elements/progress.md) |
| `sources` | Present citations or supporting references. | [Sources](components/elements/sources.md) |
| `retry` | Offer a retry after an unsuccessful response. | [Retry](components/elements/retry.md) |
| `feedback` | Collect feedback about an answer. | [Feedback](components/elements/feedback.md) |
| `copy` | Copy response text or a generated value. | [Copy](components/elements/copy.md) |
| `file` | Show an attachment or supplied file. | [File](components/elements/file.md) |
| `queue` | Show queued or upcoming agent tasks. | [Queue](components/elements/queue.md) |
| `approval` | Ask for confirmation before an action. | [Approval](components/elements/approval.md) |
| `stream` | Show text arriving progressively. | [Stream](components/elements/stream.md) |
| `handoff` | Explain a transfer to a tool or agent. | [Handoff](components/elements/handoff.md) |
| `branch` | Let a user choose a plan or next path. | [Branch](components/elements/branch.md) |
| `usage` | Show a quota or usage level. | [Usage](components/elements/usage.md) |
| `steps` | Summarize ordered workflow progress. | [Steps](components/elements/steps.md) |

Supported configurable properties include `label`, `value`, and `text`. `items` accepts a JSON array of one to five strings or objects with `label` and optional `detail` for `tabs`, `sources`, `queue`, `branch`, and `steps`.

```js
document.querySelector('pixel-ui-element').addEventListener('pixel-element-change', event => {
  const { variant, state } = event.detail;
  // Run the matching application action or update application state.
});
```

The bubbling `pixel-element-change` event reports UI intent; wire it to the real app. In particular, approval, retry, handoff, and progress elements do not themselves execute external or business actions.
