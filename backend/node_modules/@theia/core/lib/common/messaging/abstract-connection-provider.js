"use strict";
// *****************************************************************************
// Copyright (C) 2020 Ericsson and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractConnectionProvider = void 0;
const inversify_1 = require("inversify");
const event_1 = require("../event");
const proxy_factory_1 = require("./proxy-factory");
const channel_1 = require("../message-rpc/channel");
/**
 * Factor common logic according to `ElectronIpcConnectionProvider` and
 * `WebSocketConnectionProvider`. This class handles channels in a somewhat
 * generic way.
 */
let AbstractConnectionProvider = class AbstractConnectionProvider {
    constructor() {
        this.onIncomingMessageActivityEmitter = new event_1.Emitter();
        // A set of channel opening functions that are executed if the backend reconnects to restore the
        // the channels that were open before the disconnect occurred.
        this.reconnectChannelOpeners = [];
    }
    /**
     * Create a proxy object to remote interface of T type
     * over an electron ipc connection for the given path.
     *
     * An optional target can be provided to handle
     * notifications and requests from a remote side.
     */
    static createProxy(container, path, target) {
        throw new Error('abstract');
    }
    get onIncomingMessageActivity() {
        return this.onIncomingMessageActivityEmitter.event;
    }
    createProxy(path, arg) {
        const factory = arg instanceof proxy_factory_1.JsonRpcProxyFactory ? arg : new proxy_factory_1.JsonRpcProxyFactory(arg);
        this.listen({
            path,
            onConnection: c => factory.listen(c)
        });
        return factory.createProxy();
    }
    initializeMultiplexer() {
        const mainChannel = this.createMainChannel();
        mainChannel.onMessage(() => this.onIncomingMessageActivityEmitter.fire());
        this.channelMultiplexer = new channel_1.ChannelMultiplexer(mainChannel);
    }
    /**
     * Install a connection handler for the given path.
     */
    listen(handler, options) {
        this.openChannel(handler.path, channel => {
            handler.onConnection(channel);
        }, options);
    }
    async openChannel(path, handler, options) {
        if (!this.channelMultiplexer) {
            throw new Error('The channel multiplexer has not been initialized yet!');
        }
        const newChannel = await this.channelMultiplexer.open(path);
        newChannel.onClose(() => {
            const { reconnecting } = Object.assign({ reconnecting: true }, options);
            if (reconnecting) {
                this.reconnectChannelOpeners.push(() => this.openChannel(path, handler, options));
            }
        });
        handler(newChannel);
    }
};
AbstractConnectionProvider = __decorate([
    (0, inversify_1.injectable)()
], AbstractConnectionProvider);
exports.AbstractConnectionProvider = AbstractConnectionProvider;
//# sourceMappingURL=abstract-connection-provider.js.map