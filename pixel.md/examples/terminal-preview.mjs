import {
  askPixelCommand,
  pixelAgents,
  pixelBox,
  pixelChoices,
  pixelConfirm,
  pixelDiff,
  pixelMeter,
  pixelOutput,
  pixelProgress,
  pixelSession,
  pixelSteps,
  pixelSpinnerFrame,
  pixelStream,
  pixelTaskList,
  pixelWaveFrame
} from '../src/pixel-cli.js';

console.log('\n' + pixelBox('BUILD COMPLETE', ['12 files compiled', '0 errors · 1.42s']));
console.log('\n' + pixelChoices(['Development', 'Production', 'Preview'], { selected: 1, hint: 'SELECT TARGET' }));
console.log('\n' + pixelSteps(['Plan', 'Build', 'Ship'], { active: 1 }));
console.log('\n' + pixelMeter('CONTEXT WINDOW', 68, { columns: 16, rows: 2 }));
console.log('\n' + pixelSpinnerFrame('INDEXING FILES', 2));
console.log('\n' + pixelWaveFrame('TOKEN FLOW', 3));
console.log('\n' + pixelAgents([
  { name: 'planner', state: 'done', detail: '1.2s' },
  { name: 'researcher', state: 'thinking', detail: '8s' },
  { name: 'builder', state: 'running', detail: '3/5 files' }
]));
console.log('\n' + pixelStream('Partial response from the model', { frame: 3 }));
console.log('\n' + pixelOutput({
  command: 'pixel run build',
  lines: ['24 modules bundled', 'Type check passed'],
  status: 'success',
  duration: '1.8s'
}));

console.log('\n' + pixelProgress('build', 2, { max: 3 }));
console.log(pixelTaskList(['resolve dependencies', 'compile 12 files', 'verify output'], { active: 1 }));
console.log('\n' + pixelDiff(['- const mode = "idle";', '+ const mode = "thinking";']));
console.log('\n' + pixelSession({ name: 'dev server', state: 'running', url: 'localhost:5173', pid: 2481 }));

if (process.argv.includes('--interactive')) {
  const command = await askPixelCommand({ cwd: '~/project' });
  const accepted = await pixelConfirm(`Pass this command to your runner: ${command}?`);
  console.log(accepted ? `  ▪ Confirmed. Pass “${command}” to your runner.` : '  · Cancelled');
}
