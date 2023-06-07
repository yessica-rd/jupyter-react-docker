export { ArrayUtils } from './array-utils';
export { Prioritizeable } from './prioritizeable';
declare type UnknownObject<T extends object> = Record<string | number | symbol, unknown> & {
    [K in keyof T]: unknown;
};
export declare type Deferred<T> = {
    [P in keyof T]: Promise<T[P]>;
};
export declare type MaybeArray<T> = T | T[];
export declare type MaybeNull<T> = {
    [P in keyof T]: T[P] | null;
};
export declare type MaybePromise<T> = T | PromiseLike<T>;
export declare type MaybeUndefined<T> = {
    [P in keyof T]?: T[P] | undefined;
};
export declare type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};
export declare type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer I)[] ? RecursivePartial<I>[] : RecursivePartial<T[P]>;
};
export declare function isBoolean(value: unknown): value is boolean;
export declare function isString(value: unknown): value is string;
export declare function isNumber(value: unknown): value is number;
export declare function isError(value: unknown): value is Error;
export declare function isErrorLike(value: unknown): value is Error;
export declare function isFunction<T extends (...args: unknown[]) => unknown>(value: unknown): value is T;
export declare function isObject<T extends object>(value: unknown): value is UnknownObject<T>;
export declare function isUndefined(value: unknown): value is undefined;
/**
 * @param value value to check.
 * @param every optional predicate ran on every element of the array.
 * @param thisArg value to substitute `this` with when invoking in the predicate.
 * @returns whether or not `value` is an array.
 */
export declare function isArray<T>(value: unknown, every?: (value: unknown) => unknown, thisArg?: unknown): value is T[];
export declare function isStringArray(value: unknown): value is string[];
/**
 * Creates a shallow copy with all ownkeys of the original object that are `null` made `undefined`
 */
export declare function nullToUndefined<T>(nullable: MaybeNull<T>): MaybeUndefined<T>;
/**
 * Throws when called and statically makes sure that all variants of a type were consumed.
 */
export declare function unreachable(_never: never, message?: string): never;
//# sourceMappingURL=types.d.ts.map