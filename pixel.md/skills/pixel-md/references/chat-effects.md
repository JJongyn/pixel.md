# Chat input effects

Import `pixel.md/chat-effect` and wrap the app's existing composer. Preserve its semantics, focus behavior, keyboard handling, validation, and submit logic. The effect is decoration around the supplied content.

```html
<pixel-chat-effect variant="orbit">
  <textarea aria-label="Message" placeholder="Ask anything…"></textarea>
</pixel-chat-effect>
```

| Effect | Use for | Component guide |
| --- | --- | --- |
| `orbit` | Quiet pixel signals moving along the perimeter. | [Orbit](components/chat-effects/orbit.md) |
| `hop` | A few pixels making a shallow, restrained bounce. | [Hop](components/chat-effects/hop.md) |
| `anchor` | Subtle breathing color at the frame corners. | [Anchor](components/chat-effects/anchor.md) |
| `bevel` | The pixel frame rotating around a vertical axis. | [Bevel](components/chat-effects/bevel.md) |
| `tilt` | The pixel frame rotating around a horizontal axis. | [Tilt](components/chat-effects/tilt.md) |
| `prism` | A small diagonal 3D movement around the frame. | [Prism](components/chat-effects/prism.md) |
| `car` | Slow idle cruise before a message is sent. | [Roadtrip](components/chat-effects/car.md) |
| `car-working` | Regular-speed cruise with a flickering pixel exhaust while the agent works. | [Roadtrip](components/chat-effects/car.md) |
| `cat` | A sleeping cat resting both paws on the input rim. | [Cat nap](components/chat-effects/cat.md) |
| `cat-working` | A cat holding and eagerly licking a pixel churro while the agent works. | [Cat nap](components/chat-effects/cat.md) |

Optional `speed` accepts `0.2`–`3`, `intensity` accepts `0.2`–`1.5`, and `paused` stops animation. Start with default values and one effect on the primary composer. The component pauses offscreen and when the tab is hidden; reduced-motion users receive a still treatment. Keep the input itself responsible for sending messages.
