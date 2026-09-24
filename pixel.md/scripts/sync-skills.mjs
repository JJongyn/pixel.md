import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repositoryRoot = resolve(packageRoot, '..');
const skillSource = join(repositoryRoot, 'skills');
const requiredSkills = [
  'pixel-md/SKILL.md',
  'pixel-md/references/indicators.md',
  'pixel-md/references/chat-effects.md',
  'pixel-md/references/elements.md',
  'pixel-md/references/bots.md',
  'pixel-md/references/terminal.md',
  'pixel-md-indicator/SKILL.md',
  'pixel-md-chat-effect/SKILL.md',
  'pixel-md-elements/SKILL.md'
];

const missingSkills = requiredSkills.filter(path => !existsSync(join(skillSource, path)));
if (missingSkills.length) {
  throw new Error(`The source skill catalog is incomplete: ${missingSkills.join(', ')}`);
}

for (const destination of [
  join(packageRoot, 'skills'),
  join(repositoryRoot, 'plugins', 'pixel-md', 'skills')
]) {
  rmSync(destination, { recursive: true, force: true });
  mkdirSync(dirname(destination), { recursive: true });
  cpSync(skillSource, destination, { recursive: true });
}

const packageManifest = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'));
const version = packageManifest.version;
const versionedManifests = [
  join(repositoryRoot, 'plugins', 'pixel-md', '.codex-plugin', 'plugin.json'),
  join(repositoryRoot, 'plugins', 'pixel-md', '.claude-plugin', 'plugin.json'),
  join(repositoryRoot, '.claude-plugin', 'marketplace.json')
];

for (const path of versionedManifests) {
  if (!existsSync(path)) continue;
  const manifest = JSON.parse(readFileSync(path, 'utf8'));
  if (Array.isArray(manifest.plugins)) {
    manifest.plugins = manifest.plugins.map(plugin =>
      plugin.name === 'pixel-md' ? { ...plugin, version } : plugin
    );
  } else {
    manifest.version = version;
  }
  writeFileSync(path, `${JSON.stringify(manifest, null, 2)}\n`);
}
