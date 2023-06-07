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
var MessagingContribution_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagingContribution = exports.MessagingContainer = void 0;
const socket_io_1 = require("socket.io");
const inversify_1 = require("inversify");
const common_1 = require("../../common");
const web_socket_channel_1 = require("../../common/messaging/web-socket-channel");
const messaging_service_1 = require("./messaging-service");
const connection_container_module_1 = require("./connection-container-module");
const Route = require("route-parser");
const ws_request_validators_1 = require("../ws-request-validators");
const messaging_listeners_1 = require("./messaging-listeners");
const channel_1 = require("../../common/message-rpc/channel");
exports.MessagingContainer = Symbol('MessagingContainer');
let MessagingContribution = MessagingContribution_1 = class MessagingContribution {
    constructor() {
        this.wsHandlers = new MessagingContribution_1.ConnectionHandlers();
        this.channelHandlers = new MessagingContribution_1.ConnectionHandlers();
        this.checkAliveTimeout = 30000; // 30 seconds
        this.maxHttpBufferSize = 1e8; // 100 MB
    }
    init() {
        this.ws(web_socket_channel_1.WebSocketChannel.wsPath, (_, socket) => this.handleChannels(socket));
        for (const contribution of this.contributions.getContributions()) {
            contribution.configure(this);
        }
    }
    wsChannel(spec, callback) {
        this.channelHandlers.push(spec, (params, channel) => callback(params, channel));
    }
    ws(spec, callback) {
        this.wsHandlers.push(spec, callback);
    }
    onStart(server) {
        const socketServer = new socket_io_1.Server(server, {
            pingInterval: this.checkAliveTimeout,
            pingTimeout: this.checkAliveTimeout * 2,
            maxHttpBufferSize: this.maxHttpBufferSize
        });
        // Accept every namespace by using /.*/
        socketServer.of(/.*/).on('connection', async (socket) => {
            const request = socket.request;
            // Socket.io strips the `origin` header of the incoming request
            // We provide a `fix-origin` header in the `WebSocketConnectionProvider`
            request.headers.origin = request.headers['fix-origin'];
            if (await this.allowConnect(socket.request)) {
                this.handleConnection(socket);
                this.messagingListener.onDidWebSocketUpgrade(socket.request, socket);
            }
            else {
                socket.disconnect(true);
            }
        });
    }
    handleConnection(socket) {
        const pathname = socket.nsp.name;
        if (pathname && !this.wsHandlers.route(pathname, socket)) {
            console.error('Cannot find a ws handler for the path: ' + pathname);
        }
    }
    async allowConnect(request) {
        try {
            return this.wsRequestValidator.allowWsUpgrade(request);
        }
        catch (e) {
            return false;
        }
    }
    handleChannels(socket) {
        const socketChannel = new web_socket_channel_1.WebSocketChannel(this.toIWebSocket(socket));
        const multiplexer = new channel_1.ChannelMultiplexer(socketChannel);
        const channelHandlers = this.getConnectionChannelHandlers(socket);
        multiplexer.onDidOpenChannel(event => {
            if (channelHandlers.route(event.id, event.channel)) {
                console.debug(`Opening channel for service path '${event.id}'.`);
                event.channel.onClose(() => console.debug(`Closing channel on service path '${event.id}'.`));
            }
        });
    }
    toIWebSocket(socket) {
        return {
            close: () => {
                socket.removeAllListeners('disconnect');
                socket.removeAllListeners('error');
                socket.removeAllListeners('message');
                socket.disconnect();
            },
            isConnected: () => socket.connected,
            onClose: cb => socket.on('disconnect', reason => cb(reason)),
            onError: cb => socket.on('error', error => cb(error)),
            onMessage: cb => socket.on('message', data => cb(data)),
            send: message => socket.emit('message', message)
        };
    }
    createSocketContainer(socket) {
        const connectionContainer = this.container.createChild();
        connectionContainer.bind(socket_io_1.Socket).toConstantValue(socket);
        return connectionContainer;
    }
    getConnectionChannelHandlers(socket) {
        const connectionContainer = this.createSocketContainer(socket);
        (0, common_1.bindContributionProvider)(connectionContainer, common_1.ConnectionHandler);
        connectionContainer.load(...this.connectionModules.getContributions());
        const connectionChannelHandlers = new MessagingContribution_1.ConnectionHandlers(this.channelHandlers);
        const connectionHandlers = connectionContainer.getNamed(common_1.ContributionProvider, common_1.ConnectionHandler);
        for (const connectionHandler of connectionHandlers.getContributions(true)) {
            connectionChannelHandlers.push(connectionHandler.path, (_, channel) => {
                connectionHandler.onConnection(channel);
            });
        }
        return connectionChannelHandlers;
    }
};
__decorate([
    (0, inversify_1.inject)(exports.MessagingContainer),
    __metadata("design:type", Object)
], MessagingContribution.prototype, "container", void 0);
__decorate([
    (0, inversify_1.inject)(common_1.ContributionProvider),
    (0, inversify_1.named)(connection_container_module_1.ConnectionContainerModule),
    __metadata("design:type", Object)
], MessagingContribution.prototype, "connectionModules", void 0);
__decorate([
    (0, inversify_1.inject)(common_1.ContributionProvider),
    (0, inversify_1.named)(messaging_service_1.MessagingService.Contribution),
    __metadata("design:type", Object)
], MessagingContribution.prototype, "contributions", void 0);
__decorate([
    (0, inversify_1.inject)(ws_request_validators_1.WsRequestValidator),
    __metadata("design:type", ws_request_validators_1.WsRequestValidator)
], MessagingContribution.prototype, "wsRequestValidator", void 0);
__decorate([
    (0, inversify_1.inject)(messaging_listeners_1.MessagingListener),
    __metadata("design:type", messaging_listeners_1.MessagingListener)
], MessagingContribution.prototype, "messagingListener", void 0);
__decorate([
    (0, inversify_1.postConstruct)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MessagingContribution.prototype, "init", null);
MessagingContribution = MessagingContribution_1 = __decorate([
    (0, inversify_1.injectable)()
], MessagingContribution);
exports.MessagingContribution = MessagingContribution;
(function (MessagingContribution) {
    class ConnectionHandlers {
        constructor(parent) {
            this.parent = parent;
            this.handlers = [];
        }
        push(spec, callback) {
            const route = new Route(spec);
            this.handlers.push((path, channel) => {
                const params = route.match(path);
                if (!params) {
                    return false;
                }
                callback(params, channel);
                return route.reverse(params);
            });
        }
        route(path, connection) {
            for (const handler of this.handlers) {
                try {
                    const result = handler(path, connection);
                    if (result) {
                        return result;
                    }
                }
                catch (e) {
                    console.error(e);
                }
            }
            if (this.parent) {
                return this.parent.route(path, connection);
            }
            return false;
        }
    }
    MessagingContribution.ConnectionHandlers = ConnectionHandlers;
})(MessagingContribution = exports.MessagingContribution || (exports.MessagingContribution = {}));
exports.MessagingContribution = MessagingContribution;
//# sourceMappingURL=messaging-contribution.js.map