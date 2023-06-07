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
var ElectronIpcConnectionProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectronIpcRendererChannel = exports.ElectronIpcConnectionProvider = void 0;
const inversify_1 = require("inversify");
const abstract_connection_provider_1 = require("../../common/messaging/abstract-connection-provider");
const common_1 = require("../../common");
const uint8_array_message_buffer_1 = require("../../common/message-rpc/uint8-array-message-buffer");
/**
 * Connection provider between the Theia frontend and the electron-main process via IPC.
 */
let ElectronIpcConnectionProvider = ElectronIpcConnectionProvider_1 = class ElectronIpcConnectionProvider extends abstract_connection_provider_1.AbstractConnectionProvider {
    static createProxy(container, path, arg) {
        return container.get(ElectronIpcConnectionProvider_1).createProxy(path, arg);
    }
    constructor() {
        super();
        this.initializeMultiplexer();
    }
    createMainChannel() {
        return new ElectronIpcRendererChannel();
    }
};
ElectronIpcConnectionProvider = ElectronIpcConnectionProvider_1 = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], ElectronIpcConnectionProvider);
exports.ElectronIpcConnectionProvider = ElectronIpcConnectionProvider;
class ElectronIpcRendererChannel extends common_1.AbstractChannel {
    constructor() {
        super();
        this.toDispose.push(window.electronTheiaCore.onData(data => this.onMessageEmitter.fire(() => new uint8_array_message_buffer_1.Uint8ArrayReadBuffer(data))));
    }
    getWriteBuffer() {
        const writer = new uint8_array_message_buffer_1.Uint8ArrayWriteBuffer();
        writer.onCommit(buffer => window.electronTheiaCore.sendData(buffer));
        return writer;
    }
}
exports.ElectronIpcRendererChannel = ElectronIpcRendererChannel;
//# sourceMappingURL=electron-ipc-connection-provider.js.map