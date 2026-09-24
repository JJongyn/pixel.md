# Terminal development session

Use the session variant to show the state of a local development server or long-running CLI process.

```js
import { pixelSession } from 'pixel.md/terminal';

console.log(pixelSession({
  name: 'dev server',
  state: 'running',
  url: 'localhost:5173',
  pid: 2481
}));
```

Source the port, PID, and state from the actual process manager. This formatter does not start or stop processes.
