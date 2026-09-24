# Voice control

Use `variant="voice"` as a compact voice-input control beside a composer. It displays the host application's `state`: `idle`, `listening`, `processing`, or `speaking`. Clicking emits `start-listening` or `stop-listening`; it never requests microphone access itself.

```html
<pixel-ui-element id="voice" variant="voice" state="idle"></pixel-ui-element>
<script type="module">
  import 'pixel.md/elements';
  const voice = document.querySelector('#voice');
  voice.addEventListener('pixel-element-change', ({ detail }) => {
    if (detail.state === 'start-listening') beginAuthorizedVoiceCapture();
    if (detail.state === 'stop-listening') finishVoiceCapture();
  });
  // Set from your real recorder / speech service state.
  voice.setAttribute('state', 'listening');
</script>
```

Keep the mic control at least 44 CSS pixels high for touch. Respect browser microphone permissions and provide a text status for assistive technology.
