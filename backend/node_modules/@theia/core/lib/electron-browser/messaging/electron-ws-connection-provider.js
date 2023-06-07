"use strict";
// *****************************************************************************
// Copyright (C) 2019 TypeFox and others.
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
exports.ElectronWebSocketConnectionProvider = void 0;
const inversify_1 = require("inversify");
const ws_connection_provider_1 = require("../../browser/messaging/ws-connection-provider");
/**
 * Customized connection provider between the frontend and the backend in electron environment.
 * This customized connection provider makes sure the websocket connection does not try to reconnect
 * once the electron-browser window is refreshed. Otherwise, backend resources are not disposed.
 */
let ElectronWebSocketConnectionProvider = class ElectronWebSocketConnectionProvider extends ws_connection_provider_1.WebSocketConnectionProvider {
    constructor() {
        super(...arguments);
        /**
         * Do not try to reconnect when the frontend application is stopping. The browser is navigating away from this page.
         */
        this.stopping = false;
    }
    onStop() {
        var _a;
        this.stopping = true;
        // Manually close the websocket connections `onStop`. Otherwise, the channels will be closed with 30 sec (`MessagingContribution#checkAliveTimeout`) delay.
        // https://github.com/eclipse-theia/theia/issues/6499
        // `1001` indicates that an endpoint is "going away", such as a server going down or a browser having navigated away from a page.
        (_a = this.channelMultiplexer) === null || _a === void 0 ? void 0 : _a.onUnderlyingChannelClose({ reason: 'The frontend is "going away"', code: 1001 });
    }
    async openChannel(path, handler, options) {
        if (!this.stopping) {
            super.openChannel(path, handler, options);
        }
    }
};
ElectronWebSocketConnectionProvider = __decorate([
    (0, inversify_1.injectable)()
], ElectronWebSocketConnectionProvider);
exports.ElectronWebSocketConnectionProvider = ElectronWebSocketConnectionProvider;
//# sourceMappingURL=electron-ws-connection-provider.js.map