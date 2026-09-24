# Roadtrip

Use the car scene to reflect whether an assistant is waiting or working. Idle mode cruises slowly; working mode keeps the regular pace and adds a small flickering pixel exhaust.

```html
<pixel-chat-effect variant="car">
  <your-existing-chat-input></your-existing-chat-input>
</pixel-chat-effect>
```

After submission, switch `variant` to `car-working`; when the task ends, switch it back to `car`. Import `pixel.md/chat-effect`. Set `paused` to stop the scene; motion respects reduced-motion preferences.
