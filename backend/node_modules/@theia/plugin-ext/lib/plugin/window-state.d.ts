import { URI } from './types-impl';
import { WindowState } from '@theia/plugin';
import { WindowStateExt } from '../common/plugin-api-rpc';
import { Event } from '@theia/core/lib/common/event';
import { RPCProtocol } from '../common/rpc-protocol';
export declare class WindowStateExtImpl implements WindowStateExt {
    private windowStateCached;
    private windowStateChangedEmitter;
    readonly onDidChangeWindowState: Event<WindowState>;
    private readonly proxy;
    constructor(rpc: RPCProtocol);
    getWindowState(): WindowState;
    $onWindowStateChanged(focused: boolean): void;
    openUri(uri: URI): Promise<boolean>;
    asExternalUri(target: URI): Promise<URI>;
}
//# sourceMappingURL=window-state.d.ts.map