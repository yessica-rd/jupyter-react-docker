export declare const isIE: boolean;
export declare const isEdge: boolean;
export declare const isEdgeOrIE: boolean;
export declare const isOpera: boolean;
export declare const isFirefox: boolean;
export declare const isWebKit: boolean;
export declare const isChrome: boolean;
export declare const isSafari: boolean;
export declare const isIPad: boolean;
export declare const isNative: boolean;
export declare const isBasicWasmSupported: boolean;
/**
 * Resolves after the next animation frame if no parameter is given,
 * or after the given number of animation frames.
 */
export declare function animationFrame(n?: number): Promise<void>;
/**
 * Parse a magnitude value (e.g. width, height, left, top) from a CSS attribute value.
 * Returns the given default value (or undefined) if the value cannot be determined,
 * e.g. because it is a relative value like `50%` or `auto`.
 */
export declare function parseCssMagnitude(value: string | null, defaultValue: number): number;
/**
 * Parse the number of milliseconds from a CSS time value.
 * Returns the given default value (or undefined) if the value cannot be determined.
 */
export declare function parseCssTime(time: string | null, defaultValue: number): number;
/**
 * Prevent browser back/forward navigation of a mouse wheel event.
 */
export declare function preventNavigation(event: WheelEvent): void;
export declare type PartialCSSStyle = Omit<Partial<CSSStyleDeclaration>, 'visibility' | 'display' | 'parentRule' | 'getPropertyPriority' | 'getPropertyValue' | 'item' | 'removeProperty' | 'setProperty'>;
export declare function measureTextWidth(text: string | string[], style?: PartialCSSStyle): number;
export declare function measureTextHeight(text: string | string[], style?: PartialCSSStyle): number;
//# sourceMappingURL=browser.d.ts.map