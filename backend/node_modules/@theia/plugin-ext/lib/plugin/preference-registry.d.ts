import { Event } from '@theia/core/lib/common/event';
import { IConfigurationOverrides } from '@theia/monaco-editor-core/esm/vs/platform/configuration/common/configuration';
import { Workspace } from '@theia/monaco-editor-core/esm/vs/platform/workspace/common/workspace';
import * as theia from '@theia/plugin';
import { PreferenceChangeExt, PreferenceData, PreferenceRegistryExt } from '../common/plugin-api-rpc';
import { RPCProtocol } from '../common/rpc-protocol';
import { WorkspaceExtImpl } from './workspace';
export declare enum PreferenceScope {
    Default = 0,
    User = 1,
    Workspace = 2,
    Folder = 3
}
export declare class TheiaWorkspace extends Workspace {
    constructor(ext: WorkspaceExtImpl);
}
export declare class PreferenceRegistryExtImpl implements PreferenceRegistryExt {
    private readonly workspace;
    private proxy;
    private _preferences;
    private readonly _onDidChangeConfiguration;
    readonly onDidChangeConfiguration: Event<theia.ConfigurationChangeEvent>;
    constructor(rpc: RPCProtocol, workspace: WorkspaceExtImpl);
    init(data: PreferenceData): void;
    $acceptConfigurationChanged(data: PreferenceData, eventData: PreferenceChangeExt[]): void;
    private preferencesChanged;
    getConfiguration(rawSection?: string, rawScope?: theia.ConfigurationScope | null, extensionId?: string): theia.WorkspaceConfiguration;
    private toReadonlyValue;
    private parse;
    private getConfigurationModel;
    /**
     * Creates a new object and assigns those keys of raw to it that are not likely to cause prototype pollution.
     * Also preprocesses override identifiers so that they take the form [identifier]: {...contents}.
     */
    private sanitize;
    private readonly OVERRIDE_KEY_TEST;
    private toConfigurationChangeEvent;
    protected parseConfigurationAccessOptions(scope?: theia.ConfigurationScope | null): IConfigurationOverrides;
}
//# sourceMappingURL=preference-registry.d.ts.map