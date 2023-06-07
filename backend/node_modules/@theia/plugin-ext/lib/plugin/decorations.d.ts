import * as theia from '@theia/plugin';
import { DecorationReply, DecorationRequest, DecorationsExt, PluginInfo } from '../common/plugin-api-rpc';
import { RPCProtocol } from '../common/rpc-protocol';
import { CancellationToken } from '@theia/core/lib/common';
export declare class DecorationsExtImpl implements DecorationsExt {
    readonly rpc: RPCProtocol;
    private static handle;
    private static maxEventSize;
    private readonly providersMap;
    private readonly proxy;
    constructor(rpc: RPCProtocol);
    registerFileDecorationProvider(provider: theia.FileDecorationProvider, pluginInfo: PluginInfo): theia.Disposable;
    $provideDecorations(handle: number, requests: DecorationRequest[], token: CancellationToken): Promise<DecorationReply>;
}
//# sourceMappingURL=decorations.d.ts.map