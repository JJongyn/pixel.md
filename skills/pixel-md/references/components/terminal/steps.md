# Workflow rail

Show a short ordered workflow with completed, active, and pending pixel nodes.

```js
import { pixelSteps } from 'pixel.md/terminal';

console.log(pixelSteps(['Plan', 'Build', 'Ship'], { active: 1 }));
```

The active index is zero-based. Steps before it render as complete.
