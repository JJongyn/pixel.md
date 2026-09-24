export type PixelBotVariant = 'mote' | 'sprout' | 'spark' | 'wisp' | 'gear' | 'comet' | 'prism' | 'kernel';
export type PixelBotState = 'idle' | 'thinking' | 'working' | 'speaking' | 'success' | 'sleeping';

/** Registers the <pixel-bot-avatar> pixel agent character when imported in a browser. */
export declare class PixelBotAvatar extends HTMLElement {}

declare global {
  interface HTMLElementTagNameMap {
    'pixel-bot-avatar': PixelBotAvatar;
  }
}
