export type PixelChatEffectVariant =
  | 'orbit' | 'hop' | 'anchor' | 'bevel' | 'tilt' | 'prism';

/** Registers the <pixel-chat-effect> custom element when imported in a browser. */
export declare class PixelChatEffect extends HTMLElement {}

declare global {
  interface HTMLElementTagNameMap {
    'pixel-chat-effect': PixelChatEffect;
  }
}
