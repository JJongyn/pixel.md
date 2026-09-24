# Agent workflow UI elements

Import `pixel.md/elements`. Choose an element for a real interaction, then connect its event or attributes to application state.

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
| `file` | Show a single attachment. | [File](components/elements/file.md) |
| `queue` | Show queued or upcoming agent tasks. | [Queue](components/elements/queue.md) |
| `approval` | Ask for confirmation before an action. | [Approval](components/elements/approval.md) |
| `stream` | Show text arriving progressively. | [Stream](components/elements/stream.md) |
| `handoff` | Explain a transfer to a tool or agent. | [Handoff](components/elements/handoff.md) |
| `branch` | Let a user choose a plan or next path. | [Branch](components/elements/branch.md) |
| `usage` | Show a quota or usage level. | [Usage](components/elements/usage.md) |
| `steps` | Summarize ordered workflow progress. | [Steps](components/elements/steps.md) |
| `voice` | Present voice capture, transcription, and speech states. | [Voice](components/elements/voice.md) |
| `new-response` | Let readers return to the latest messages. | [New response](components/elements/new-response.md) |
| `upload` | Select files and show queued, uploading, processing, ready, or failed states. | [Upload](components/elements/upload.md) |

Supported properties include `label`, `value`, `text`, `items`, and `state`. `items` accepts a JSON array of one to five strings or objects with `label` and optional `detail` for `tabs`, `sources`, `queue`, `branch`, and `steps`. The upload list accepts up to eight file items with `label`, `detail`, `state`, and `progress`:

```html
<pixel-ui-element variant="upload" items='[{"label":"brief.pdf","detail":"2.4 MB · PDF","state":"uploading","progress":68}]'></pixel-ui-element>
```

Connect the bubbling `pixel-element-change` event to application behavior. The event reports user intent; microphone permission/capture, conversation scrolling, file transport, retries, approvals, and agent operations remain with the host application.

```js
document.querySelector('pixel-ui-element[variant="voice"]')
  .addEventListener('pixel-element-change', ({ detail }) => {
    if (detail.state === 'start-listening') startYourMicrophoneFlow();
  });
```
