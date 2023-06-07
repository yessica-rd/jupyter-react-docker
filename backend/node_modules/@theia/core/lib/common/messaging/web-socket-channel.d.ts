import { WriteBuffer } from '../message-rpc';
import { AbstractChannel } from '../message-rpc/channel';
/**
 * A channel that manages the main websocket connection between frontend and backend. All service channels
 * are reusing this main channel. (multiplexing). An {@link IWebSocket} abstraction is used to keep the implementation
 * independent of the actual websocket implementation and its execution context (backend vs. frontend).
 */
export declare class WebSocketChannel extends AbstractChannel {
    protected readonly socket: IWebSocket;
    static wsPath: string;
    constructor(socket: IWebSocket);
    getWriteBuffer(): WriteBuffer;
}
/**
 * An abstraction that enables reuse of the `{@link WebSocketChannel} class in the frontend and backend
 * independent of the actual underlying socket implementation.
 */
export interface IWebSocket {
    /**
     * Sends the given message over the web socket in binary format.
     * @param message The binary message.
     */
    send(message: Uint8Array): void;
    /**
     * Closes the websocket from the local side.
     */
    close(): void;
    /**
     * The connection state of the web socket.
     */
    isConnected(): boolean;
    /**
     * Listener callback to handle incoming messages.
     * @param cb The callback.
     */
    onMessage(cb: (message: Uint8Array) => void): void;
    /**
     * Listener callback to handle socket errors.
     * @param cb The callback.
     */
    onError(cb: (reason: any) => void): void;
    /**
     * Listener callback to handle close events (Remote side).
     * @param cb The callback.
     */
    onClose(cb: (reason: string, code?: number) => void): void;
}
//# sourceMappingURL=web-socket-channel.d.ts.map