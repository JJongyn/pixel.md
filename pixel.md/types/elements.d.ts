export type PixelUIVariant =
  | 'toggle' | 'count' | 'toast' | 'tabs' | 'check' | 'reveal'
  | 'progress' | 'sources' | 'retry' | 'feedback' | 'copy'
  | 'file' | 'queue' | 'approval' | 'stream' | 'handoff'
  | 'branch' | 'usage' | 'steps';

export interface PixelElementChangeDetail {
  variant: PixelUIVariant;
  state: string | number;
}

/** Registers the <pixel-ui-element> custom element when imported in a browser. */
export declare class PixelUIElement extends HTMLElement {}

declare global {
  interface HTMLElementTagNameMap {
    'pixel-ui-element': PixelUIElement;
  }
}
