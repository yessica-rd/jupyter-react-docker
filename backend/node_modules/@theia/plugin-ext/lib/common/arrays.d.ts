/**
 * @returns New array with all falsy values removed. The original array IS NOT modified.
 */
export declare function coalesce<T>(array: ReadonlyArray<T | undefined | null>): T[];
/**
 * @returns True if the provided object is an array and has at least one element.
 */
export declare function isNonEmptyArray<T>(obj: T[] | undefined | null): obj is T[];
export declare function isNonEmptyArray<T>(obj: readonly T[] | undefined | null): obj is readonly T[];
export declare function flatten<T>(arr: T[][]): T[];
export interface Splice<T> {
    readonly start: number;
    readonly deleteCount: number;
    readonly toInsert: T[];
}
/**
 * @returns 'true' if the 'arg' is a 'ReadonlyArray'.
 */
export declare function isReadonlyArray(arg: unknown): arg is readonly unknown[];
//# sourceMappingURL=arrays.d.ts.map