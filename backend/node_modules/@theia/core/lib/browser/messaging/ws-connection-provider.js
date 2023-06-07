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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var WebSocketConnectionProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketConnectionProvider = void 0;
const inversify_1 = require("inversify");
const common_1 = require("../../common");
const endpoint_1 = require("../endpoint");
const abstract_connection_provider_1 = require("../../common/messaging/abstract-connection-provider");
const socket_io_client_1 = require("socket.io-client");
const web_socket_channel_1 = require("../../common/messaging/web-socket-channel");
(0, inversify_1.decorate)((0, inversify_1.injectable)(), common_1.JsonRpcProxyFactory);
(0, inversify_1.decorate)((0, inversify_1.unmanaged)(), common_1.JsonRpcProxyFactory, 0);
let WebSocketConnectionProvider = WebSocketConnectionProvider_1 = class WebSocketConnectionProvider extends abstract_connection_provider_1.AbstractConnectionProvider {
    constructor() {
        super();
        this.onSocketDidOpenEmitter = new common_1.Emitter();
        this.onSocketDidCloseEmitter = new common_1.Emitter();
        const url = this.createWebSocketUrl(web_socket_channel_1.WebSocketChannel.wsPath);
        this.socket = this.createWebSocket(url);
        this.socket.on('connect', () => {
            this.initializeMultiplexer();
            if (this.reconnectChannelOpeners.length > 0) {
                this.reconnectChannelOpeners.forEach(opener => opener());
                this.reconnectChannelOpeners = [];
            }
            this.socket.on('disconnect', () => this.fireSocketDidClose());
            this.socket.on('message', () => this.onIncomingMessageActivityEmitter.fire(undefined));
            this.fireSocketDidOpen();
        });
        this.socket.connect();
    }
    get onSocketDidOpen() {
        return this.onSocketDidOpenEmitter.event;
    }
    get onSocketDidClose() {
        return this.onSocketDidCloseEmitter.event;
    }
    static createProxy(container, path, arg) {
        return container.get(WebSocketConnectionProvider_1).createProxy(path, arg);
    }
    createMainChannel() {
        return new web_socket_channel_1.WebSocketChannel(this.toIWebSocket(this.socket));
    }
    toIWebSocket(socket) {
        return {
            close: () => {
                socket.removeAllListeners('disconnect');
                socket.removeAllListeners('error');
                socket.removeAllListeners('message');
            },
            isConnected: () => socket.connected,
            onClose: cb => socket.on('disconnect', reason => cb(reason)),
            onError: cb => socket.on('error', reason => cb(reason)),
            onMessage: cb => socket.on('message', data => cb(data)),
            send: message => socket.emit('message', message)
        };
    }
    async openChannel(path, handler, options) {
        if (this.socket.connected) {
            return super.openChannel(path, handler, options);
        }
        else {
            const openChannel = () => {
                this.socket.off('connect', openChannel);
                this.openChannel(path, handler, options);
            };
            this.socket.on('connect', openChannel);
        }
    }
    /**
     * @param path The handler to reach in the backend.
     */
    createWebSocketUrl(path) {
        // Since we are using Socket.io, the path should look like the following:
        // proto://domain.com/{path}
        return new endpoint_1.Endpoint().getWebSocketUrl().withPath(path).toString();
    }
    createHttpWebSocketUrl(path) {
        return new endpoint_1.Endpoint({ path }).getRestUrl().toString();
    }
    /**
     * Creates a web socket for the given url
     */
    createWebSocket(url) {
        return (0, socket_io_client_1.io)(url, {
            path: this.createSocketIoPath(url),
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 10000,
            reconnectionAttempts: Infinity,
            extraHeaders: {
                // Socket.io strips the `origin` header
                // We need to provide our own for validation
                'fix-origin': window.location.origin
            }
        });
    }
    /**
     * Path for Socket.io to make its requests to.
     */
    createSocketIoPath(url) {
        if (location.protocol === endpoint_1.Endpoint.PROTO_FILE) {
            return '/socket.io';
        }
        let { pathname } = location;
        if (!pathname.endsWith('/')) {
            pathname += '/';
        }
        return pathname + 'socket.io';
    }
    fireSocketDidOpen() {
        this.onSocketDidOpenEmitter.fire(undefined);
    }
    fireSocketDidClose() {
        this.onSocketDidCloseEmitter.fire(undefined);
    }
};
WebSocketConnectionProvider = WebSocketConnectionProvider_1 = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], WebSocketConnectionProvider);
exports.WebSocketConnectionProvider = WebSocketConnectionProvider;
//# sourceMappingURL=ws-connection-provider.js.map