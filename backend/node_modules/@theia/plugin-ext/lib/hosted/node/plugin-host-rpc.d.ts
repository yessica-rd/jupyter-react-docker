import { PluginManagerExtImpl } from '../../plugin/plugin-manager';
import { LocalizationExt, Plugin } from '../../common/plugin-api-rpc';
import { EnvExtImpl } from '../../plugin/env';
import { PreferenceRegistryExtImpl } from '../../plugin/preference-registry';
import { KeyValueStorageProxy } from '../../plugin/plugin-storage';
import { WebviewsExtImpl } from '../../plugin/webviews';
import { TerminalServiceExtImpl } from '../../plugin/terminal-ext';
import { SecretsExtImpl } from '../../plugin/secrets-ext';
/**
 * Handle the RPC calls.
 */
export declare class PluginHostRPC {
    protected readonly rpc: any;
    private apiFactory;
    private pluginManager;
    constructor(rpc: any);
    initialize(): void;
    terminate(): Promise<void>;
    initContext(contextPath: string, plugin: Plugin): void;
    createPluginManager(envExt: EnvExtImpl, terminalService: TerminalServiceExtImpl, storageProxy: KeyValueStorageProxy, preferencesManager: PreferenceRegistryExtImpl, webview: WebviewsExtImpl, secretsExt: SecretsExtImpl, localization: LocalizationExt, rpc: any): PluginManagerExtImpl;
}
//# sourceMappingURL=plugin-host-rpc.d.ts.map