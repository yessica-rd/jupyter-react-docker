import { Disposable, StatusBarAlignment } from './types-impl';
import { StatusBarItem } from '@theia/plugin';
import { StatusBarMessageRegistryMain } from '../common/plugin-api-rpc';
import { RPCProtocol } from '../common/rpc-protocol';
export declare class StatusBarMessageRegistryExt {
    proxy: StatusBarMessageRegistryMain;
    protected readonly statusMessage: StatusBarMessage;
    constructor(rpc: RPCProtocol);
    setStatusBarMessage(text: string, timeoutOrThenable?: number | PromiseLike<any>): Disposable;
    createStatusBarItem(alignment?: StatusBarAlignment, priority?: number, id?: string): StatusBarItem;
}
declare class StatusBarMessage {
    private _item;
    private _messages;
    constructor(statusBar: StatusBarMessageRegistryExt);
    dispose(): void;
    setMessage(message: string): Disposable;
    private _update;
}
export {};
//# sourceMappingURL=status-bar-message-registry.d.ts.map