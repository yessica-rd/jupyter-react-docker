"use strict";
// *****************************************************************************
// Copyright (C) 2017 TypeFox and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectronWindowService = void 0;
const inversify_1 = require("inversify");
const default_window_service_1 = require("../../browser/window/default-window-service");
const electron_main_window_service_1 = require("../../electron-common/electron-main-window-service");
const electron_window_preferences_1 = require("./electron-window-preferences");
let ElectronWindowService = class ElectronWindowService extends default_window_service_1.DefaultWindowService {
    constructor() {
        super(...arguments);
        /**
         * Lock to prevent multiple parallel executions of the `beforeunload` listener.
         */
        this.isUnloading = false;
        /**
         * Close the window right away when `true`, else check if we can unload.
         */
        this.closeOnUnload = false;
    }
    openNewWindow(url, { external } = {}) {
        this.delegate.openNewWindow(url, { external });
        return undefined;
    }
    openNewDefaultWindow() {
        this.delegate.openNewDefaultWindow();
    }
    init() {
        // Update the default zoom level on startup when the preferences event is fired.
        this.electronWindowPreferences.onPreferenceChanged(e => {
            if (e.preferenceName === 'window.zoomLevel') {
                this.updateWindowZoomLevel();
            }
        });
    }
    registerUnloadListeners() {
        window.electronTheiaCore.setCloseRequestHandler(reason => this.isSafeToShutDown(reason));
        window.addEventListener('unload', () => {
            this.onUnloadEmitter.fire();
        });
    }
    /**
     * Updates the window zoom level based on the preference value.
     */
    async updateWindowZoomLevel() {
        const preferredZoomLevel = this.electronWindowPreferences['window.zoomLevel'];
        if (await window.electronTheiaCore.getZoomLevel() !== preferredZoomLevel) {
            window.electronTheiaCore.setZoomLevel(preferredZoomLevel);
        }
    }
    reload() {
        window.electronTheiaCore.requestReload();
    }
};
__decorate([
    (0, inversify_1.inject)(electron_main_window_service_1.ElectronMainWindowService),
    __metadata("design:type", Object)
], ElectronWindowService.prototype, "delegate", void 0);
__decorate([
    (0, inversify_1.inject)(electron_window_preferences_1.ElectronWindowPreferences),
    __metadata("design:type", Object)
], ElectronWindowService.prototype, "electronWindowPreferences", void 0);
__decorate([
    (0, inversify_1.postConstruct)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ElectronWindowService.prototype, "init", null);
ElectronWindowService = __decorate([
    (0, inversify_1.injectable)()
], ElectronWindowService);
exports.ElectronWindowService = ElectronWindowService;
//# sourceMappingURL=electron-window-service.js.map