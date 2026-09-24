# Choice menu

Render a numbered pixel cursor menu, or collect the selected item through stdin.

```js
import { askPixelChoice, pixelChoices } from 'pixel.md/terminal';

const targets = ['Development', 'Production', 'Preview'];
console.log(pixelChoices(targets, { selected: 1 }));
const target = await askPixelChoice(targets, { selected: 1 });
```

Validate the returned choice before using it to perform an operation.
