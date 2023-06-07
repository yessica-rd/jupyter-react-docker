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
exports.WebSocketChannel = void 0;
const uint8_array_message_buffer_1 = require("../message-rpc/uint8-array-message-buffer");
const channel_1 = require("../message-rpc/channel");
const disposable_1 = require("../disposable");
/**
 * A channel that manages the main websocket connection between frontend and backend. All service channels
 * are reusing this main channel. (multiplexing). An {@link IWebSocket} abstraction is used to keep the implementation
 * independent of the actual websocket implementation and its execution context (backend vs. frontend).
 */
class WebSocketChannel extends channel_1.AbstractChannel {
    constructor(socket) {
        super();
        this.socket = socket;
        this.toDispose.push(disposable_1.Disposable.create(() => socket.close()));
        socket.onClose((reason, code) => this.onCloseEmitter.fire({ reason, code }));
        socket.onClose(() => this.close());
        socket.onError(error => this.onErrorEmitter.fire(error));
        socket.onMessage(data => this.onMessageEmitter.fire(() => {
            // In the browser context socketIO receives binary messages as ArrayBuffers.
            // So we have to convert them to a Uint8Array before delegating the message to the read buffer.
            const buffer = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
            return new uint8_array_message_buffer_1.Uint8ArrayReadBuffer(buffer);
        }));
    }
    getWriteBuffer() {
        const result = new uint8_array_message_buffer_1.Uint8ArrayWriteBuffer();
        result.onCommit(buffer => {
            if (this.socket.isConnected()) {
                this.socket.send(buffer);
            }
        });
        return result;
    }
}
exports.WebSocketChannel = WebSocketChannel;
WebSocketChannel.wsPath = '/services';
//# sourceMappingURL=web-socket-channel.js.map