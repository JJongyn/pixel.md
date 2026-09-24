import { cpSync, existsSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(packageRoot, '..', 'skills');
const destination = resolve(packageRoot, 'skills');
const names = ['pixel-md-indicator', 'pixel-md-chat-effect', 'pixel-md-elements'];
const complete = directory => names.every(name => existsSync(join(directory, name, 'SKILL.md')));

if (complete(source)) {
  rmSync(destination, { recursive: true, force: true });
  cpSync(source, destination, { recursive: true });
} else if (!complete(destination)) {
  throw new Error('The three pixel.md skills are missing.');
}
