import { interfaces } from 'inversify';
import { JsonRpcProxy, Emitter, Event, Channel } from '../../common';
import { AbstractConnectionProvider } from '../../common/messaging/abstract-connection-provider';
import { Socket } from 'socket.io-client';
import { IWebSocket } from '../../common/messaging/web-socket-channel';
export interface WebSocketOptions {
    /**
     * True by default.
     */
    reconnecting?: boolean;
}
export declare class WebSocketConnectionProvider extends AbstractConnectionProvider<WebSocketOptions> {
    protected readonly onSocketDidOpenEmitter: Emitter<void>;
    get onSocketDidOpen(): Event<void>;
    protected readonly onSocketDidCloseEmitter: Emitter<void>;
    get onSocketDidClose(): Event<void>;
    static createProxy<T extends object>(container: interfaces.Container, path: string, arg?: object): JsonRpcProxy<T>;
    protected readonly socket: Socket;
    constructor();
    protected createMainChannel(): Channel;
    protected toIWebSocket(socket: Socket): IWebSocket;
    openChannel(path: string, handler: (channel: Channel) => void, options?: WebSocketOptions): Promise<void>;
    /**
     * @param path The handler to reach in the backend.
     */
    protected createWebSocketUrl(path: string): string;
    protected createHttpWebSocketUrl(path: string): string;
    /**
     * Creates a web socket for the given url
     */
    protected createWebSocket(url: string): Socket;
    /**
     * Path for Socket.io to make its requests to.
     */
    protected createSocketIoPath(url: string): string | undefined;
    protected fireSocketDidOpen(): void;
    protected fireSocketDidClose(): void;
}
//# sourceMappingURL=ws-connection-provider.d.ts.map