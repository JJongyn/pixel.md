# Agent fleet

Show parallel agents or workers in a compact status list.

```js
import { pixelAgents } from 'pixel.md/terminal';

console.log(pixelAgents([
  { name: 'planner', state: 'done', detail: '1.2s' },
  { name: 'researcher', state: 'thinking', detail: '8s' },
  { name: 'builder', state: 'running', detail: '3/5 files' }
]));
```

Supported states: `running`, `working`, `done`, `success`, `thinking`, `waiting`, `failed`, `error`, and `idle`.
