import { MainMessageType } from '../common/plugin-api-rpc';
import { RPCProtocol } from '../common/rpc-protocol';
import { MessageItem, MessageOptions } from '@theia/plugin';
export declare class MessageRegistryExt {
    private proxy;
    constructor(rpc: RPCProtocol);
    showMessage(type: MainMessageType, message: string, optionsOrFirstItem?: MessageOptions | string | MessageItem, ...rest: (string | MessageItem)[]): Promise<string | MessageItem | undefined>;
}
//# sourceMappingURL=message-registry.d.ts.map