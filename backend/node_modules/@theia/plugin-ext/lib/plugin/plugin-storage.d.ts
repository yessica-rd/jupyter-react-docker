import * as theia from '@theia/plugin';
import { Event } from '@theia/core/lib/common/event';
import { StorageExt } from '../common/plugin-api-rpc';
import { KeysToAnyValues, KeysToKeysToAnyValue } from '../common/types';
import { RPCProtocol } from '../common/rpc-protocol';
export declare class Memento implements theia.Memento {
    private readonly pluginId;
    private readonly isPluginGlobalData;
    private readonly storage;
    private cache;
    constructor(pluginId: string, isPluginGlobalData: boolean, storage: KeyValueStorageProxy);
    keys(): string[];
    get<T>(key: string): T | undefined;
    get<T>(key: string, defaultValue: T): T;
    update(key: string, value: any): Promise<void>;
}
export declare class GlobalState extends Memento {
    /** @todo: API is not yet implemented. */
    setKeysForSync(keys: readonly string[]): void;
}
/**
 * Singleton.
 * Is used to proxy storage requests to main side.
 */
export declare class KeyValueStorageProxy implements StorageExt {
    private storageDataChangedEmitter;
    readonly storageDataChangedEvent: Event<KeysToKeysToAnyValue>;
    private readonly proxy;
    private globalDataCache;
    private workspaceDataCache;
    constructor(rpc: RPCProtocol);
    init(initGlobalData: KeysToKeysToAnyValue, initWorkspaceData: KeysToKeysToAnyValue): void;
    getPerPluginData(key: string, isGlobal: boolean): KeysToAnyValues;
    setPerPluginData(key: string, value: KeysToAnyValues, isGlobal: boolean): Promise<boolean>;
    $updatePluginsWorkspaceData(workspaceData: KeysToKeysToAnyValue): void;
}
//# sourceMappingURL=plugin-storage.d.ts.map