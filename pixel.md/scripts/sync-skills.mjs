import { cpSync, existsSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(packageRoot, '..', 'skills');
const destination = resolve(packageRoot, 'skills');
const complete = directory => [
  'pixel-md/SKILL.md',
  'pixel-md/references/indicators.md',
  'pixel-md/references/chat-effects.md',
  'pixel-md/references/elements.md',
  'pixel-md/references/bots.md',
  'pixel-md/references/terminal.md',
  'pixel-md/references/components/indicators/thinking.md',
  'pixel-md/references/components/indicators/searching.md',
  'pixel-md/references/components/indicators/browsing.md',
  'pixel-md/references/components/indicators/reading.md',
  'pixel-md/references/components/indicators/planning.md',
  'pixel-md/references/components/indicators/acting.md',
  'pixel-md/references/components/indicators/tool.md',
  'pixel-md/references/components/indicators/building.md',
  'pixel-md/references/components/indicators/verifying.md',
  'pixel-md/references/components/indicators/responding.md',
  'pixel-md/references/components/chat-effects/orbit.md',
  'pixel-md/references/components/chat-effects/hop.md',
  'pixel-md/references/components/chat-effects/anchor.md',
  'pixel-md/references/components/chat-effects/bevel.md',
  'pixel-md/references/components/chat-effects/tilt.md',
  'pixel-md/references/components/chat-effects/prism.md',
  'pixel-md/references/components/chat-effects/car.md',
  'pixel-md/references/components/chat-effects/cat.md',
  'pixel-md/references/components/elements/toggle.md',
  'pixel-md/references/components/elements/count.md',
  'pixel-md/references/components/elements/toast.md',
  'pixel-md/references/components/elements/tabs.md',
  'pixel-md/references/components/elements/check.md',
  'pixel-md/references/components/elements/reveal.md',
  'pixel-md/references/components/elements/progress.md',
  'pixel-md/references/components/elements/sources.md',
  'pixel-md/references/components/elements/retry.md',
  'pixel-md/references/components/elements/feedback.md',
  'pixel-md/references/components/elements/copy.md',
  'pixel-md/references/components/elements/file.md',
  'pixel-md/references/components/elements/queue.md',
  'pixel-md/references/components/elements/approval.md',
  'pixel-md/references/components/elements/stream.md',
  'pixel-md/references/components/elements/handoff.md',
  'pixel-md/references/components/elements/branch.md',
  'pixel-md/references/components/elements/usage.md',
  'pixel-md/references/components/elements/steps.md',
  'pixel-md/references/components/bots/mote.md',
  'pixel-md/references/components/bots/sprout.md',
  'pixel-md/references/components/bots/spark.md',
  'pixel-md/references/components/bots/wisp.md',
  'pixel-md/references/components/bots/gear.md',
  'pixel-md/references/components/bots/comet.md',
  'pixel-md/references/components/bots/prism.md',
  'pixel-md/references/components/bots/kernel.md',
  'pixel-md/references/components/terminal/prompt.md',
  'pixel-md/references/components/terminal/output.md',
  'pixel-md/references/components/terminal/tasks.md',
  'pixel-md/references/components/terminal/confirm.md',
  'pixel-md/references/components/terminal/diff.md',
  'pixel-md/references/components/terminal/session.md',
  'pixel-md/references/components/terminal/box.md',
  'pixel-md/references/components/terminal/choices.md',
  'pixel-md/references/components/terminal/steps.md',
  'pixel-md/references/components/terminal/meter.md',
  'pixel-md/references/components/terminal/spinner.md',
  'pixel-md/references/components/terminal/wave.md',
  'pixel-md/references/components/terminal/agents.md',
  'pixel-md/references/components/terminal/stream.md'
].every(path => existsSync(join(directory, path)));

if (complete(source)) {
  rmSync(destination, { recursive: true, force: true });
  cpSync(source, destination, { recursive: true });
} else if (!complete(destination)) {
  throw new Error('The pixel.md skill catalog or component references are missing.');
}
