"use strict";
// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
//
// This program and the accompanying materials are made available under the
// terms of the Eclipse Public License v. 2.0 which is available at
// http://www.eclipse.org/legal/epl-2.0.
//
// This Source Code may also be made available under the following Secondary
// Licenses when the conditions for such availability set forth in the Eclipse
// Public License v. 2.0 are satisfied: GNU General Public License, version 2
// with the GNU Classpath Exception which is available at
// https://www.gnu.org/software/classpath/license.html.
//
// SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
// *****************************************************************************
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestWebSocketChannelSetup = void 0;
const socket_io_client_1 = require("socket.io-client");
const channel_1 = require("../../../common/message-rpc/channel");
const web_socket_channel_1 = require("../../../common/messaging/web-socket-channel");
class TestWebSocketChannelSetup {
    constructor({ server, path }) {
        const socket = (0, socket_io_client_1.io)(`ws://localhost:${server.address().port}${web_socket_channel_1.WebSocketChannel.wsPath}`);
        this.channel = new web_socket_channel_1.WebSocketChannel(toIWebSocket(socket));
        this.multiplexer = new channel_1.ChannelMultiplexer(this.channel);
        socket.on('connect', () => {
            this.multiplexer.open(path);
        });
        socket.connect();
    }
}
exports.TestWebSocketChannelSetup = TestWebSocketChannelSetup;
function toIWebSocket(socket) {
    return {
        close: () => {
            socket.removeAllListeners('disconnect');
            socket.removeAllListeners('error');
            socket.removeAllListeners('message');
            socket.close();
        },
        isConnected: () => socket.connected,
        onClose: cb => socket.on('disconnect', reason => cb(reason)),
        onError: cb => socket.on('error', reason => cb(reason)),
        onMessage: cb => socket.on('message', data => cb(data)),
        send: message => socket.emit('message', message)
    };
}
//# sourceMappingURL=test-web-socket-channel.js.map