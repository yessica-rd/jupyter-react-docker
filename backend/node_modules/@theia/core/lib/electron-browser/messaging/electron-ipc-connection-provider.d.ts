import { interfaces } from 'inversify';
import { JsonRpcProxy } from '../../common/messaging';
import { AbstractConnectionProvider } from '../../common/messaging/abstract-connection-provider';
import { AbstractChannel, Channel, WriteBuffer } from '../../common';
export interface ElectronIpcOptions {
}
/**
 * Connection provider between the Theia frontend and the electron-main process via IPC.
 */
export declare class ElectronIpcConnectionProvider extends AbstractConnectionProvider<ElectronIpcOptions> {
    static createProxy<T extends object>(container: interfaces.Container, path: string, arg?: object): JsonRpcProxy<T>;
    constructor();
    protected createMainChannel(): Channel;
}
export declare class ElectronIpcRendererChannel extends AbstractChannel {
    constructor();
    getWriteBuffer(): WriteBuffer;
}
//# sourceMappingURL=electron-ipc-connection-provider.d.ts.map