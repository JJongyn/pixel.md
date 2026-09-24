# Stream cursor

Append a small pixel cursor to partial model output. Your stream loop owns terminal redraw and model updates.

```js
import { pixelStream } from 'pixel.md/terminal';

process.stdout.write('\r' + pixelStream(partialText, { frame: chunkIndex }));
```

Pass `cursor: false` to render the text without a cursor.
