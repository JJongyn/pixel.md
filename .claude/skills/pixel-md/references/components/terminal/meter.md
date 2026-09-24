# Pixel meter

Show usage as a dense two-dimensional block grid for context, tokens, or resources.

```js
import { pixelMeter } from 'pixel.md/terminal';

console.log(pixelMeter('CONTEXT WINDOW', 68, { max: 100, columns: 16, rows: 2 }));
```

The grid is clamped to 96 cells. Choose a row and column count that fits the terminal width.
