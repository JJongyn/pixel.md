export type PixelAgentState =
  | 'thinking' | 'searching' | 'browsing' | 'reading' | 'planning'
  | 'acting' | 'tool' | 'building' | 'verifying' | 'responding';

/** Registers the <pixel-agent-status> custom element when imported in a browser. */
export declare class PixelAgentStatus extends HTMLElement {}

declare global {
  interface HTMLElementTagNameMap {
    'pixel-agent-status': PixelAgentStatus;
  }
}
