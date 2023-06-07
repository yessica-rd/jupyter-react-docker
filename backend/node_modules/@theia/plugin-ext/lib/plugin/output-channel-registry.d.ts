import * as theia from '@theia/plugin';
import { OutputChannelRegistryExt, OutputChannelRegistryMain, PluginInfo } from '../common/plugin-api-rpc';
import { RPCProtocol } from '../common/rpc-protocol';
export declare class OutputChannelRegistryExtImpl implements OutputChannelRegistryExt {
    proxy: OutputChannelRegistryMain;
    constructor(rpc: RPCProtocol);
    createOutputChannel(name: string, pluginInfo: PluginInfo): theia.OutputChannel;
    createOutputChannel(name: string, pluginInfo: PluginInfo, options: {
        log: true;
    }): theia.LogOutputChannel;
    private doCreateOutputChannel;
    private doCreateLogOutputChannel;
}
//# sourceMappingURL=output-channel-registry.d.ts.map