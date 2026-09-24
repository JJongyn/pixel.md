# Terminal task progress

Use task progress to show which subtask is active during a longer CLI operation.

```js
import { pixelProgress, pixelTaskList } from 'pixel.md/terminal';

console.log(pixelProgress('build', 2, { max: 3 }));
console.log(pixelTaskList(['resolve dependencies', 'compile 12 files', 'verify output'], { active: 1 }));
```

Update the active index and progress value from the real process as steps finish.
