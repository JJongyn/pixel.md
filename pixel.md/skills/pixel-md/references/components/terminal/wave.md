# Pixel wave

Render a moving block wave for generation or a long-running task. `pixelWaveFrame` is useful when the host CLI already owns its render loop; `withPixelWave` animates automatically in an interactive terminal and runs quietly when output is piped.

```js
import { withPixelWave } from 'pixel.md/terminal';

const answer = await withPixelWave('GENERATING RESPONSE', () => generateResponse());
```

The helper returns the wrapped task result and does not manage the model stream itself.
