# New response affordance

Use `variant="new-response"` when the reader is away from the bottom of a conversation and new messages arrive. `value` is the unread count. Clicking emits `jump-to-latest` with that count; the host should scroll the conversation and remove or update the affordance when appropriate.

```html
<pixel-ui-element id="new-replies" variant="new-response" value="3"></pixel-ui-element>
<script type="module">
  import 'pixel.md/elements';
  const affordance = document.querySelector('#new-replies');
  affordance.addEventListener('pixel-element-change', ({ detail }) => {
    if (detail.state === 'jump-to-latest') conversation.scrollToLatest();
  });
  // Keep the count in sync with messages received while scrolled up.
  affordance.setAttribute('value', String(unreadMessages));
</script>
```

Only show it when the user is meaningfully away from the latest message. Do not force-scroll while they are reading older content.
