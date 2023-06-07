import { EnvVariablesServer } from '@theia/core/lib/common/env-variables';
import URI from '@theia/core/lib/common/uri';
export declare class PluginVSCodeEnvironment {
    protected readonly environments: EnvVariablesServer;
    protected _extensionsDirUri: URI | undefined;
    getExtensionsDirUri(): Promise<URI>;
}
//# sourceMappingURL=plugin-vscode-environment.d.ts.map