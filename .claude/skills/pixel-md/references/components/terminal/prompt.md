# Terminal command prompt

Use the prompt to collect a command in a Node CLI. It returns a string; validate it in the host app before passing it to any command runner.

```js
import { askPixelCommand } from 'pixel.md/terminal';

const command = await askPixelCommand({ cwd: '~/project' });
console.log(`Received: ${command}`);
```

The helper never invokes a shell. Treat the returned command as user input and apply the host product's own validation and authorization.
