export type PixelTerminalPreviewVariant = 'prompt' | 'output' | 'tasks' | 'confirm' | 'diff' | 'session' | 'box' | 'choices' | 'steps' | 'meter' | 'spinner' | 'wave' | 'agents' | 'stream';

/** Registers the browser-only <pixel-terminal> preview custom element. */
export declare class PixelTerminal extends HTMLElement {}

declare global {
  interface HTMLElementTagNameMap {
    'pixel-terminal': PixelTerminal;
  }
}
