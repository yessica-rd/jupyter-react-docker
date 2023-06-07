import { DebugConfiguration } from '../common/debug-common';
import { DebugCompound } from '../common/debug-compound';
export declare class DebugCompoundRoot {
    private stopped;
    private stopEmitter;
    onDidSessionStop: import("@theia/core").Event<void>;
    stopSession(): void;
}
export interface DebugSessionOptionsBase {
    workspaceFolderUri?: string;
}
export interface DebugConfigurationSessionOptions extends DebugSessionOptionsBase {
    name: string;
    configuration: DebugConfiguration;
    compound?: never;
    compoundRoot?: DebugCompoundRoot;
    providerType?: string;
}
export declare type DynamicDebugConfigurationSessionOptions = DebugConfigurationSessionOptions & {
    providerType: string;
};
export interface DebugCompoundSessionOptions extends DebugSessionOptionsBase {
    name: string;
    configuration?: never;
    compound: DebugCompound;
    noDebug?: boolean;
}
export declare type DebugSessionOptions = DebugConfigurationSessionOptions | DebugCompoundSessionOptions;
export declare namespace DebugSessionOptions {
    function isConfiguration(options?: DebugSessionOptions): options is DebugConfigurationSessionOptions;
    function isDynamic(options?: DebugSessionOptions): options is DynamicDebugConfigurationSessionOptions;
    function isCompound(options?: DebugSessionOptions): options is DebugCompoundSessionOptions;
}
/**
 * Flat and partial version of a debug session options usable to find the options later in the manager.
 * @deprecated Not needed anymore, the recommended way is to serialize/deserialize the options directly using `JSON.stringify` and `JSON.parse`.
 */
export declare type DebugSessionOptionsData = DebugSessionOptionsBase & (DebugConfiguration | DebugCompound);
export declare type InternalDebugSessionOptions = DebugSessionOptions & {
    id: number;
};
export declare namespace InternalDebugSessionOptions {
    function is(options: DebugSessionOptions): options is InternalDebugSessionOptions;
    /** @deprecated Please use `JSON.stringify` to serialize the options. */
    function toValue(options: DebugSessionOptions): string;
    /** @deprecated Please use `JSON.parse` to restore previously serialized debug session options. */
    function parseValue(value: string): DebugSessionOptionsData;
}
//# sourceMappingURL=debug-session-options.d.ts.map