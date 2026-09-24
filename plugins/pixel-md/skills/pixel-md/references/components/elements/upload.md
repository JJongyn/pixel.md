# Attachment upload queue

Use `variant="upload"` for a compact multi-file picker and per-file status list. Selecting files emits `files-selected` with the native `File[]` (up to eight are shown in the compact preview); removing a row emits `remove-file` and its `index`. The host performs validation, upload, scanning, and processing, then reflects state using `items`.

```html
<pixel-ui-element id="attachments" variant="upload"></pixel-ui-element>
<script type="module">
  import 'pixel.md/elements';
  const attachments = document.querySelector('#attachments');
  attachments.addEventListener('pixel-element-change', async ({ detail }) => {
    if (detail.state === 'files-selected') {
      await uploadAndProcess(detail.files); // Your transport and validation.
    }
    if (detail.state === 'remove-file') removeFromDraft(detail.index);
  });
  // Replace with the current host-owned file state as it changes.
  attachments.setAttribute('items', JSON.stringify([
    { label: 'brief.pdf', detail: '2.4 MB · PDF', state: 'processing', progress: 72 },
    { label: 'flow.png', detail: '1.8 MB · image', state: 'ready', progress: 100 }
  ]));
</script>
```

Item `state` may be `queued`, `uploading`, `processing`, `ready`, or `error`. `progress` is a number from 0 to 100 and is shown for queued/uploading/processing rows. Limit accepted file types and sizes in the host application.
