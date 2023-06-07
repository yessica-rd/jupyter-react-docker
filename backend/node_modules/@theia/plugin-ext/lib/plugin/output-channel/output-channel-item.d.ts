import * as theia from '@theia/plugin';
import { OutputChannelRegistryMain, PluginInfo } from '../../common/plugin-api-rpc';
export declare class OutputChannelImpl implements theia.OutputChannel {
    readonly name: string;
    protected readonly proxy: OutputChannelRegistryMain;
    protected readonly pluginInfo: PluginInfo;
    private disposed;
    constructor(name: string, proxy: OutputChannelRegistryMain, pluginInfo: PluginInfo);
    dispose(): void;
    append(value: string): void;
    appendLine(value: string): void;
    replace(value: string): void;
    clear(): void;
    show(preserveFocusOrColumn?: boolean | theia.ViewColumn, preserveFocus?: boolean): void;
    hide(): void;
    protected validate(): void;
}
//# sourceMappingURL=output-channel-item.d.ts.map