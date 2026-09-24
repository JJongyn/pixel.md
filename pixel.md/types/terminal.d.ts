export interface PixelProgressOptions { max?: number; width?: number; }
export interface PixelBoxOptions { tone?: 'mint' | 'amber' | 'rose' | 'blue' | 'violet'; width?: number; }
export interface PixelChoiceOptions { selected?: number; hint?: string; }
export interface PixelMeterOptions { max?: number; columns?: number; rows?: number; tone?: 'mint' | 'amber' | 'rose' | 'blue' | 'violet'; }
export interface PixelStepsOptions { active?: number; }
export interface PixelSpinnerOptions { interval?: number; }
export interface PixelWaveOptions extends PixelSpinnerOptions { width?: number; }
export interface PixelPromptOptions { cwd?: string; name?: string; initial?: string; }
export interface PixelConfirmOptions { defaultValue?: boolean; }
export interface PixelOutputOptions { command?: string; lines?: string[]; status?: string; duration?: string; }
export interface PixelSessionOptions { name?: string; state?: string; url?: string; pid?: string | number; }

export function pixelMark(): string;
export function pixelBox(title: string, lines?: string[], options?: PixelBoxOptions): string;
export function pixelPrompt(options?: Omit<PixelPromptOptions, 'initial'>): string;
export function askPixelCommand(options?: PixelPromptOptions): Promise<string>;
export function pixelChoices(items: string[], options?: PixelChoiceOptions): string;
export function askPixelChoice(items: string[], options?: PixelChoiceOptions): Promise<string | undefined>;
export function pixelProgress(label: string, value: number, options?: PixelProgressOptions): string;
export function pixelMeter(label: string, value: number, options?: PixelMeterOptions): string;
export function pixelTaskList(tasks: string[], options?: { active?: number }): string;
export function pixelSteps(steps: string[], options?: PixelStepsOptions): string;
export function pixelSpinnerFrame(label: string, frame?: number): string;
export function withPixelSpinner<T>(label: string, task: () => Promise<T> | T, options?: PixelSpinnerOptions): Promise<T>;
export function pixelWaveFrame(label: string, frame?: number, width?: number): string;
export function withPixelWave<T>(label: string, task: () => Promise<T> | T, options?: PixelWaveOptions): Promise<T>;
export interface PixelAgentStatus { name: string; state?: 'running' | 'working' | 'done' | 'success' | 'thinking' | 'waiting' | 'failed' | 'error' | 'idle'; detail?: string; }
export function pixelAgents(agents: PixelAgentStatus[]): string;
export function pixelStream(text: string, options?: { frame?: number; cursor?: boolean }): string;
export function pixelConfirm(message: string, options?: PixelConfirmOptions): Promise<boolean>;
export function pixelDiff(lines: string[]): string;
export function pixelOutput(options?: PixelOutputOptions): string;
export function pixelSession(options?: PixelSessionOptions): string;
export function isPixelColorEnabled(): boolean;
