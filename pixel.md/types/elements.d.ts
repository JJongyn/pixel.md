export type PixelUIVariant =
  | 'toggle' | 'count' | 'toast' | 'tabs' | 'check' | 'reveal'
  | 'progress' | 'sources' | 'retry' | 'feedback' | 'copy'
  | 'file' | 'queue' | 'approval' | 'stream' | 'handoff'
  | 'branch' | 'usage' | 'steps' | 'voice' | 'new-response' | 'upload';

export interface PixelElementFileItem {
  label: string;
  detail?: string;
  state?: 'queued' | 'uploading' | 'processing' | 'ready' | 'error';
  progress?: number;
}

export interface PixelElementChangeDetail {
  variant: PixelUIVariant;
  state: string | number;
  files?: File[];
  index?: number;
  file?: string;
  count?: number;
}

/** Registers the <pixel-ui-element> custom element when imported in a browser. */
export declare class PixelUIElement extends HTMLElement {
  variant: PixelUIVariant;
}

declare global {
  interface HTMLElementTagNameMap {
    'pixel-ui-element': PixelUIElement;
  }
}
