/// <reference types="node" />
import * as http from 'http';
import * as https from 'https';
import { Channel, ChannelMultiplexer } from '../../../common/message-rpc/channel';
export declare class TestWebSocketChannelSetup {
    readonly multiplexer: ChannelMultiplexer;
    readonly channel: Channel;
    constructor({ server, path }: {
        server: http.Server | https.Server;
        path: string;
    });
}
//# sourceMappingURL=test-web-socket-channel.d.ts.map