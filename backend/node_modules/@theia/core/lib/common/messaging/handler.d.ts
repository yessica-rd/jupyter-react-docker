import { Channel } from '../message-rpc/channel';
export declare const ConnectionHandler: unique symbol;
export interface ConnectionHandler {
    readonly path: string;
    onConnection(connection: Channel): void;
}
//# sourceMappingURL=handler.d.ts.map