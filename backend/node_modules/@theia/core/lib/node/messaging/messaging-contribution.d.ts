/// <reference types="node" />
import * as http from 'http';
import * as https from 'https';
import { Socket } from 'socket.io';
import { interfaces, Container } from 'inversify';
import { ContributionProvider } from '../../common';
import { IWebSocket } from '../../common/messaging/web-socket-channel';
import { BackendApplicationContribution } from '../backend-application';
import { MessagingService } from './messaging-service';
import { WsRequestValidator } from '../ws-request-validators';
import { MessagingListener } from './messaging-listeners';
import { Channel } from '../../common/message-rpc/channel';
export declare const MessagingContainer: unique symbol;
export declare class MessagingContribution implements BackendApplicationContribution, MessagingService {
    protected readonly container: interfaces.Container;
    protected readonly connectionModules: ContributionProvider<interfaces.ContainerModule>;
    protected readonly contributions: ContributionProvider<MessagingService.Contribution>;
    protected readonly wsRequestValidator: WsRequestValidator;
    protected readonly messagingListener: MessagingListener;
    protected readonly wsHandlers: MessagingContribution.ConnectionHandlers<Socket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>>;
    protected readonly channelHandlers: MessagingContribution.ConnectionHandlers<Channel>;
    protected init(): void;
    wsChannel(spec: string, callback: (params: MessagingService.PathParams, channel: Channel) => void): void;
    ws(spec: string, callback: (params: MessagingService.PathParams, socket: Socket) => void): void;
    protected checkAliveTimeout: number;
    protected maxHttpBufferSize: number;
    onStart(server: http.Server | https.Server): void;
    protected handleConnection(socket: Socket): void;
    protected allowConnect(request: http.IncomingMessage): Promise<boolean>;
    protected handleChannels(socket: Socket): void;
    protected toIWebSocket(socket: Socket): IWebSocket;
    protected createSocketContainer(socket: Socket): Container;
    protected getConnectionChannelHandlers(socket: Socket): MessagingContribution.ConnectionHandlers<Channel>;
}
export declare namespace MessagingContribution {
    class ConnectionHandlers<T> {
        protected readonly parent?: ConnectionHandlers<T> | undefined;
        protected readonly handlers: ((path: string, connection: T) => string | false)[];
        constructor(parent?: ConnectionHandlers<T> | undefined);
        push(spec: string, callback: (params: MessagingService.PathParams, connection: T) => void): void;
        route(path: string, connection: T): string | false;
    }
}
//# sourceMappingURL=messaging-contribution.d.ts.map