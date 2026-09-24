# Terminal run confirmation

Use a confirmation prompt before a command that changes files, deploys, or affects a shared environment.

```js
import { pixelConfirm } from 'pixel.md/terminal';

const approved = await pixelConfirm('Deploy 3 changed files to production?');
if (!approved) process.exitCode = 1;
```

Confirmation defaults to no. Treat approval as one input to the CLI's policy checks, and only start deployment after all required checks pass.
