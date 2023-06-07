"use strict";
// *****************************************************************************
// Copyright (C) 2022 Ericsson and others.
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
exports.TheiaElectronWindowFactory = exports.TheiaElectronWindow = exports.WindowApplicationConfig = exports.TheiaBrowserWindowOptions = void 0;
const frontend_application_state_1 = require("../common/frontend-application-state");
const electron_1 = require("../../electron-shared/electron");
const inversify_1 = require("../../shared/inversify");
const electron_main_constants_1 = require("./electron-main-constants");
const common_1 = require("../common");
const event_utils_1 = require("./event-utils");
const uri_1 = require("../common/uri");
const file_uri_1 = require("../node/file-uri");
const electron_api_main_1 = require("./electron-api-main");
exports.TheiaBrowserWindowOptions = Symbol('TheiaBrowserWindowOptions');
exports.WindowApplicationConfig = Symbol('WindowApplicationConfig');
let TheiaElectronWindow = class TheiaElectronWindow {
    constructor() {
        this.onDidCloseEmitter = new common_1.Emitter();
        this.toDispose = new common_1.DisposableCollection(this.onDidCloseEmitter);
        this.closeIsConfirmed = false;
        this.applicationState = 'init';
    }
    get onDidClose() {
        return this.onDidCloseEmitter.event;
    }
    get window() {
        return this._window;
    }
    init() {
        this._window = new electron_1.BrowserWindow(this.options);
        this._window.setMenuBarVisibility(false);
        this.attachReadyToShow();
        this.restoreMaximizedState();
        this.attachCloseListeners();
        this.trackApplicationState();
        this.attachReloadListener();
    }
    /**
     * Only show the window when the content is ready.
     */
    attachReadyToShow() {
        this._window.once('ready-to-show', () => this._window.show());
    }
    attachCloseListeners() {
        (0, event_utils_1.createDisposableListener)(this._window, 'closed', () => {
            this.onDidCloseEmitter.fire();
            this.dispose();
        }, this.toDispose);
        (0, event_utils_1.createDisposableListener)(this._window, 'close', async (event) => {
            // User has already indicated that it is OK to close this window, or the window is being closed before it's ready.
            if (this.closeIsConfirmed || this.applicationState !== 'ready') {
                return;
            }
            event.preventDefault();
            this.handleStopRequest(() => this.doCloseWindow(), frontend_application_state_1.StopReason.Close);
        }, this.toDispose);
    }
    doCloseWindow() {
        this.closeIsConfirmed = true;
        this._window.close();
    }
    close(reason = frontend_application_state_1.StopReason.Close) {
        return this.handleStopRequest(() => this.doCloseWindow(), reason);
    }
    reload() {
        this.handleStopRequest(() => {
            this.applicationState = 'init';
            this._window.reload();
        }, frontend_application_state_1.StopReason.Reload);
    }
    async handleStopRequest(onSafeCallback, reason) {
        // Only confirm close to windows that have loaded our frontend.
        // Both the windows's URL and the FS path of the `index.html` should be converted to the "same" format to be able to compare them. (#11226)
        // Notes:
        //  - Windows: file:///C:/path/to/somewhere vs file:///c%3A/path/to/somewhere
        //  - macOS: file:///Applications/App%20Name.app/Contents vs /Applications/App Name.app/Contents
        // This URL string comes from electron, we can expect that this is properly encoded URL. For example, a space is `%20`
        const currentUrl = new uri_1.URI(this.window.webContents.getURL()).toString();
        // THEIA_FRONTEND_HTML_PATH is an FS path, we have to covert to an encoded URI string.
        const frontendUri = file_uri_1.FileUri.create(this.globals.THEIA_FRONTEND_HTML_PATH).toString();
        const safeToClose = !currentUrl.includes(frontendUri) || await this.checkSafeToStop(reason);
        if (safeToClose) {
            try {
                await onSafeCallback();
                return true;
            }
            catch (e) {
                console.warn(`Request ${frontend_application_state_1.StopReason[reason]} failed.`, e);
            }
        }
        return false;
    }
    checkSafeToStop(reason) {
        return electron_api_main_1.TheiaRendererAPI.requestClose(this.window.webContents, reason);
    }
    restoreMaximizedState() {
        if (this.options.isMaximized) {
            this._window.maximize();
        }
        else {
            this._window.unmaximize();
        }
    }
    trackApplicationState() {
        this.toDispose.push(electron_api_main_1.TheiaRendererAPI.onApplicationStateChanged(this.window.webContents, state => {
            this.applicationState = state;
        }));
    }
    attachReloadListener() {
        this.toDispose.push(electron_api_main_1.TheiaRendererAPI.onRequestReload(this.window.webContents, () => this.reload()));
    }
    dispose() {
        this.toDispose.dispose();
    }
};
__decorate([
    (0, inversify_1.inject)(exports.TheiaBrowserWindowOptions),
    __metadata("design:type", Object)
], TheiaElectronWindow.prototype, "options", void 0);
__decorate([
    (0, inversify_1.inject)(exports.WindowApplicationConfig),
    __metadata("design:type", Object)
], TheiaElectronWindow.prototype, "config", void 0);
__decorate([
    (0, inversify_1.inject)(electron_main_constants_1.ElectronMainApplicationGlobals),
    __metadata("design:type", Object)
], TheiaElectronWindow.prototype, "globals", void 0);
__decorate([
    (0, inversify_1.postConstruct)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TheiaElectronWindow.prototype, "init", null);
TheiaElectronWindow = __decorate([
    (0, inversify_1.injectable)()
], TheiaElectronWindow);
exports.TheiaElectronWindow = TheiaElectronWindow;
exports.TheiaElectronWindowFactory = Symbol('TheiaElectronWindowFactory');
//# sourceMappingURL=theia-electron-window.js.map