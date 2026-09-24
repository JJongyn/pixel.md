# Stepped panel

Frame a short status or result using stepped corners and square edges.

```js
import { pixelBox } from 'pixel.md/terminal';

console.log(pixelBox('BUILD COMPLETE', ['12 files compiled', '0 errors · 1.42s'], { tone: 'mint' }));
```

Available tones are `mint`, `amber`, `rose`, `blue`, and `violet`. Keep content short enough to scan in a terminal.
