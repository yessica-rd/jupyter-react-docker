import { Plugin, SecretsExt } from '../common/plugin-api-rpc';
import { RPCProtocol } from '../common/rpc-protocol';
import { Event } from '@theia/core/lib/common/event';
import * as theia from '@theia/plugin';
export declare class SecretsExtImpl implements SecretsExt {
    private proxy;
    private onDidChangePasswordEmitter;
    readonly onDidChangePassword: Event<{
        extensionId: string;
        key: string;
    }>;
    constructor(rpc: RPCProtocol);
    $onDidChangePassword(e: {
        extensionId: string;
        key: string;
    }): Promise<void>;
    get(extensionId: string, key: string): Promise<string | undefined>;
    store(extensionId: string, key: string, value: string): Promise<void>;
    delete(extensionId: string, key: string): Promise<void>;
}
export declare class SecretStorageExt implements theia.SecretStorage {
    protected readonly id: string;
    readonly secretState: SecretsExtImpl;
    private onDidChangeEmitter;
    readonly onDidChange: Event<theia.SecretStorageChangeEvent>;
    constructor(pluginDescription: Plugin, secretState: SecretsExtImpl);
    get(key: string): Promise<string | undefined>;
    store(key: string, value: string): Promise<void>;
    delete(key: string): Promise<void>;
}
//# sourceMappingURL=secrets-ext.d.ts.map