import { interfaces } from 'inversify';
import { Emitter, Event } from '../event';
import { ConnectionHandler } from './handler';
import { JsonRpcProxy, JsonRpcProxyFactory } from './proxy-factory';
import { Channel, ChannelMultiplexer } from '../message-rpc/channel';
/**
 * Factor common logic according to `ElectronIpcConnectionProvider` and
 * `WebSocketConnectionProvider`. This class handles channels in a somewhat
 * generic way.
 */
export declare abstract class AbstractConnectionProvider<AbstractOptions extends object> {
    /**
     * Create a proxy object to remote interface of T type
     * over an electron ipc connection for the given path and proxy factory.
     */
    static createProxy<T extends object>(container: interfaces.Container, path: string, factory: JsonRpcProxyFactory<T>): JsonRpcProxy<T>;
    protected readonly onIncomingMessageActivityEmitter: Emitter<void>;
    get onIncomingMessageActivity(): Event<void>;
    /**
     * Create a proxy object to remote interface of T type
     * over a web socket connection for the given path and proxy factory.
     */
    createProxy<T extends object>(path: string, factory: JsonRpcProxyFactory<T>): JsonRpcProxy<T>;
    /**
     * Create a proxy object to remote interface of T type
     * over a web socket connection for the given path.
     *
     * An optional target can be provided to handle
     * notifications and requests from a remote side.
     */
    createProxy<T extends object>(path: string, target?: object): JsonRpcProxy<T>;
    protected channelMultiplexer?: ChannelMultiplexer;
    protected reconnectChannelOpeners: Array<() => Promise<void>>;
    protected initializeMultiplexer(): void;
    /**
     * Install a connection handler for the given path.
     */
    listen(handler: ConnectionHandler, options?: AbstractOptions): void;
    openChannel(path: string, handler: (channel: Channel) => void, options?: AbstractOptions): Promise<void>;
    /**
     * Create the main connection that is used for multiplexing all service channels.
     */
    protected abstract createMainChannel(): Channel;
}
//# sourceMappingURL=abstract-connection-provider.d.ts.map