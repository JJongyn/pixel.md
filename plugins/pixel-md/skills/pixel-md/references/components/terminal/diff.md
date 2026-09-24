# Terminal diff

Use the diff variant to show a small code change summary inside a CLI workflow.

```js
import { pixelDiff } from 'pixel.md/terminal';

console.log(pixelDiff([
  '- const mode = "idle";',
  '+ const mode = "thinking";',
  '+ await agent.run(task);'
]));
```

For real diffs, pass line strings after reading them from your VCS integration and keep the full patch reviewable in the host product.
