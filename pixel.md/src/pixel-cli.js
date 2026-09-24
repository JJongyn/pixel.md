import { createInterface } from 'node:readline/promises';
import process, { stdin, stdout } from 'node:process';

const colorEnabled = () => Boolean(stdout.isTTY && !process.env.NO_COLOR && process.env.TERM !== 'dumb');
const paint = (code, value) => colorEnabled() ? `\u001b[${code}m${value}\u001b[0m` : String(value);
const green = value => paint('38;5;151', value);
const muted = value => paint('38;5;108', value);
const ink = value => paint('38;5;252', value);
const warm = value => paint('38;5;180', value);
const red = value => paint('38;5;174', value);
const blue = value => paint('38;5;117', value);
const violet = value => paint('38;5;183', value);
const mark = () => `${green('▟')}${green('▀')}${green('▙')}`;
const clean = value => String(value ?? '').replace(/\u001b\[[0-?]*[ -/]*[@-~]/g, '').replace(/[\x00-\x1f\x7f]/g, ' ').trim();

const palette = tone => ({ mint: green, amber: warm, rose: red, blue, violet })[tone] || green;
const displayWidth = value => [...clean(value)].reduce((width, char) => width + (/[^\u0000-\u00ff]/.test(char) ? 2 : 1), 0);

/** A compact pixel.md identity mark for terminal command lines. */
export function pixelMark() {
  return [
    `  ${green('▄█▄')}  `,
    `  ${green('█')}${muted('▀')}${green('█')}  `,
    `  ${muted('▀▀▀')}  `
  ].join('\n');
}

/** Draw a stepped pixel frame around a short message or command result. */
export function pixelBox(title, lines = [], { tone = 'mint', width = 46 } = {}) {
  const accent = palette(tone);
  const content = [clean(title), ...lines.map(clean)];
  const inner = Math.max(12, Math.min(72, Number(width) || 46));
  const top = `  ▛${'▀'.repeat(inner)}▜`;
  const bottom = `  ▙${'▄'.repeat(inner)}▟`;
  const body = content.map((line, index) => {
    const clipped = [...line].slice(0, inner - 2).join('');
    const padding = Math.max(0, inner - 2 - displayWidth(clipped));
    const text = index === 0 ? accent(clipped) : ink(clipped);
    return `  ${accent('▌')} ${text}${' '.repeat(padding)} ${accent('▐')}`;
  });
  return [accent(top), ...body, accent(bottom)].join('\n');
}

/** Format the command prefix used by the other CLI components. */
export function pixelPrompt({ cwd = '~/project', name = 'pixel' } = {}) {
  return `${green(mark())} ${ink(clean(name))} ${muted(clean(cwd))} ${green('›')} `;
}

/** Read one command from stdin. This prompts only; the host app decides what may run. */
export async function askPixelCommand({ cwd = '~/project', name = 'pixel', initial = '' } = {}) {
  const rl = createInterface({ input: stdin, output: stdout });
  try {
    const answer = await rl.question(`${pixelPrompt({ cwd, name })}${initial ? muted(`[${clean(initial)}] `) : ''}`);
    return answer.trim() || initial;
  } finally {
    rl.close();
  }
}

/** Render a numbered pixel selection menu. */
export function pixelChoices(items, { selected = 0, hint = 'CHOOSE ONE' } = {}) {
  const heading = `${violet('▛')} ${ink(clean(hint))}`;
  const options = items.map((item, index) => {
    const current = index === selected;
    const marker = current ? violet('■') : muted('·');
    return `  ${marker} ${current ? ink(`${index + 1}. ${clean(item)}`) : muted(`${index + 1}. ${clean(item)}`)}`;
  });
  return [heading, ...options].join('\n');
}

/** Read a numbered choice from stdin and return the selected item. */
export async function askPixelChoice(items, { selected = 0, hint = 'Choose an option' } = {}) {
  if (!items.length) return undefined;
  const rl = createInterface({ input: stdin, output: stdout });
  try {
    const answer = await rl.question(`${pixelChoices(items, { selected, hint })}\n${pixelPrompt()}Select [1-${items.length}] `);
    const index = answer.trim() ? Number(answer) - 1 : selected;
    return Number.isInteger(index) && index >= 0 && index < items.length ? items[index] : undefined;
  } finally {
    rl.close();
  }
}

/** Render a CLI progress meter with square pixels. */
export function pixelProgress(label, value, { max = 100, width = 12 } = {}) {
  const safeMax = Math.max(1, Number(max) || 100);
  const safeValue = Math.max(0, Math.min(safeMax, Number(value) || 0));
  const safeWidth = Math.max(1, Math.min(48, Math.floor(Number(width) || 12)));
  const filled = Math.round((safeValue / safeMax) * safeWidth);
  const blocks = `${green('▰'.repeat(filled))}${muted('▱'.repeat(Math.max(0, safeWidth - filled)))}`;
  return `${mark()} ${ink(clean(label))} ${blocks} ${muted(`${Math.round((safeValue / safeMax) * 100)}%`)}`;
}

/** Render a dense 2D pixel meter for tokens, context, or resource usage. */
export function pixelMeter(label, value, { max = 100, columns = 12, rows = 3, tone = 'blue' } = {}) {
  const safeMax = Math.max(1, Number(max) || 100);
  const total = Math.max(1, Math.min(96, Math.floor(Number(columns) || 12) * Math.floor(Number(rows) || 3)));
  const filled = Math.round(Math.max(0, Math.min(safeMax, Number(value) || 0)) / safeMax * total);
  const accent = palette(tone);
  const pixels = Array.from({ length: total }, (_, index) => index < filled ? accent('▰') : muted('▱'));
  const lines = [];
  for (let index = 0; index < total; index += Math.ceil(total / rows)) lines.push(pixels.slice(index, index + Math.ceil(total / rows)).join(''));
  const percent = Math.round(Math.max(0, Math.min(safeMax, Number(value) || 0)) / safeMax * 100);
  return `${violet('▛')} ${ink(clean(label))} ${muted(`${percent}%`)}\n${lines.map(line => `  ${line}`).join('\n')}`;
}

/** Render a task list with one active pixel marker and completed checks. */
export function pixelTaskList(tasks, { active = -1 } = {}) {
  return tasks.map((task, index) => {
    const marker = index < active ? green('▪') : index === active ? ink('■') : muted('·');
    const label = index < active ? muted(clean(task)) : index === active ? ink(clean(task)) : muted(clean(task));
    return `  ${marker} ${label}`;
  }).join('\n');
}

/** Render an ordered workflow with chunky pixel nodes and a stepped rail. */
export function pixelSteps(steps, { active = 0 } = {}) {
  return steps.map((step, index) => {
    const complete = index < active;
    const current = index === active;
    const node = complete ? green('▣') : current ? ink('■') : muted('□');
    const label = complete ? muted(clean(step)) : current ? ink(clean(step)) : muted(clean(step));
    const rail = index === steps.length - 1 ? ' ' : complete ? green('┃') : muted('┆');
    return `  ${node} ${label}${index === steps.length - 1 ? '' : `\n  ${rail}`}`;
  }).join('\n');
}

const SPINNER_FRAMES = ['■··', '·■·', '··■', '·■·'];

/** Return one 2×2 pixel spinner frame; increment frame on each terminal redraw. */
export function pixelSpinnerFrame(label, frame = 0) {
  const shape = SPINNER_FRAMES[Math.abs(Math.floor(frame)) % SPINNER_FRAMES.length];
  return `${green(shape.replace(/■/g, '▰').replace(/·/g, '▱'))} ${ink(clean(label))}`;
}

/** Render a 3-row pixel wave for streaming output or long-running generation. */
export function pixelWaveFrame(label, frame = 0, width = 18) {
  const safeWidth = Math.max(8, Math.min(48, Math.floor(Number(width) || 18)));
  const phase = Number.isFinite(Number(frame)) ? Number(frame) * 0.72 : 0;
  const heights = Array.from({ length: safeWidth }, (_, index) => Math.round((Math.sin(index * 0.72 + phase) + 1) * 2));
  const rows = Array.from({ length: 3 }, (_, row) => heights.map(height => row >= 3 - height ? green('▰') : muted('·')).join(''));
  return `${violet('▛')} ${ink(clean(label))}\n${rows.join('\n')}`;
}

/** Animate the wave while an async task runs; piped output stays clean. */
export async function withPixelWave(label, task, { interval = 140, width = 18 } = {}) {
  if (typeof task !== 'function') throw new TypeError('withPixelWave expects an async function.');
  if (!stdout.isTTY || !stdin.isTTY) return task();
  const lines = 4;
  let frame = 0;
  const draw = () => {
    stdout.write(`\u001b[${lines}A`);
    for (const line of pixelWaveFrame(label, frame++, width).split('\n')) stdout.write(`\u001b[2K\r${line}\n`);
  };
  stdout.write(`${pixelWaveFrame(label, frame++, width)}\n`);
  const timer = setInterval(draw, Math.max(80, Number(interval) || 140));
  const clear = () => {
    clearInterval(timer);
    stdout.write(`\u001b[${lines}A`);
    for (let index = 0; index < lines; index += 1) stdout.write('\u001b[2K\n');
  };
  try {
    const result = await task();
    clear();
    stdout.write(`${green('▣')} ${ink(clean(label))} ${green('DONE')}\n`);
    return result;
  } catch (error) {
    clear();
    stdout.write(`${red('▧')} ${ink(clean(label))} ${red('FAILED')}\n`);
    throw error;
  }
}

/** Render compact statuses for parallel CLI agents or worker processes. */
export function pixelAgents(agents) {
  const states = {
    running: green('▰'), working: green('▰'), done: green('▣'), success: green('▣'),
    thinking: violet('▥'), waiting: warm('▱'), failed: red('▧'), error: red('▧'), idle: muted('□')
  };
  return agents.map(agent => {
    const state = String(agent.state || 'idle').toLowerCase();
    const glyph = states[state] || muted('□');
    const detail = agent.detail ? ` ${muted(clean(agent.detail))}` : '';
    return `${glyph} ${ink(clean(agent.name || 'worker'))} ${muted(state.toUpperCase())}${detail}`;
  }).join('\n');
}

/** Format a partial streamed response with a small block cursor. */
export function pixelStream(text, { frame = 0, cursor = true } = {}) {
  const cursorGlyph = cursor ? (Math.abs(Math.floor(frame)) % 2 ? violet('▰') : green('▰')) : '';
  return `${ink(String(text ?? ''))}${cursor ? ` ${cursorGlyph}` : ''}`;
}

/** Run an async task with an animated pixel spinner in a TTY. */
export async function withPixelSpinner(label, task, { interval = 110 } = {}) {
  if (typeof task !== 'function') throw new TypeError('withPixelSpinner expects an async function.');
  if (!stdout.isTTY || !stdin.isTTY) return task();
  let frame = 0;
  const draw = () => stdout.write(`\u001b[2K\r${pixelSpinnerFrame(label, frame++)}`);
  draw();
  const timer = setInterval(draw, Math.max(60, Number(interval) || 110));
  try {
    const result = await task();
    clearInterval(timer);
    stdout.write(`\u001b[2K\r${green('▣')} ${ink(clean(label))} ${green('DONE')}\n`);
    return result;
  } catch (error) {
    clearInterval(timer);
    stdout.write(`\u001b[2K\r${red('▧')} ${ink(clean(label))} ${red('FAILED')}\n`);
    throw error;
  }
}

/** Ask for an explicit yes/no before the host app performs an action. Defaults to no. */
export async function pixelConfirm(message, { defaultValue = false } = {}) {
  const rl = createInterface({ input: stdin, output: stdout });
  const hint = defaultValue ? '[Y/n]' : '[y/N]';
  try {
    const answer = await rl.question(`${warm('◆')} ${ink(clean(message))} ${muted(hint)} `);
    if (!answer.trim()) return Boolean(defaultValue);
    return ['y', 'yes'].includes(answer.trim().toLowerCase());
  } finally {
    rl.close();
  }
}

/** Render added and removed lines in the library's restrained pixel palette. */
export function pixelDiff(lines) {
  return lines.map(line => {
    const value = clean(line);
    if (value.startsWith('+')) return `  ${green('▪')} ${green(value)}`;
    if (value.startsWith('-')) return `  ${red('▪')} ${red(value)}`;
    return `  ${muted('·')} ${ink(value.replace(/^\s/, ''))}`;
  }).join('\n');
}

/** Format one command and its result as a compact terminal transcript. */
export function pixelOutput({ command, lines = [], status = 'success', duration } = {}) {
  const transcript = [`${pixelPrompt()}${ink(clean(command))}`, ...lines.map(line => `  ${muted(clean(line))}`)];
  const suffix = duration ? ` · ${clean(duration)}` : '';
  const done = status === 'success' ? green(`✓ exit 0${suffix}`) : red(`× ${clean(status)}${suffix}`);
  transcript.push(`  ${mark()} ${done}`);
  return transcript.join('\n');
}

/** Show a long-running CLI process and its address or PID. */
export function pixelSession({ name = 'session', state = 'running', url, pid } = {}) {
  const running = state === 'running';
  const indicator = running ? green('■') : muted('□');
  const details = [url && clean(url), pid && `pid ${clean(pid)}`].filter(Boolean).join(muted(' · '));
  return `${indicator} ${ink(clean(name))} ${running ? green('RUNNING') : muted(clean(state).toUpperCase())}${details ? `  ${details}` : ''}`;
}

export { colorEnabled as isPixelColorEnabled };
