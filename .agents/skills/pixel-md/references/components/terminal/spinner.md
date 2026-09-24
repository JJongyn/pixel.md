# Activity sprite

Animate a compact pixel sprite while a promise runs. Non-interactive output runs the task without animation.

```js
import { withPixelSpinner } from 'pixel.md/terminal';

const index = await withPixelSpinner('INDEXING FILES', () => indexWorkspace());
```

The helper returns the task result and reports completion or failure. It does not execute commands itself.
