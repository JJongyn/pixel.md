# Terminal command output

Use output to show a compact command result with a completion code and pixel cursor.

```js
import { pixelOutput } from 'pixel.md/terminal';

console.log(pixelOutput({
  command: 'pnpm build',
  lines: ['24 modules bundled'],
  status: 'success',
  duration: '1.8s'
}));
```

Pass the real command, captured output lines, exit status, and duration to keep the transcript in sync with the process.
