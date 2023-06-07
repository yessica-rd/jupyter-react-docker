"use strict";
// *****************************************************************************
// Copyright (C) 2022 TypeFox and others.
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
exports.WindowTitleService = exports.InitialWindowTitleParts = void 0;
const inversify_1 = require("inversify");
const strings_1 = require("../../common/strings");
const event_1 = require("../../common/event");
const core_preferences_1 = require("../core-preferences");
const frontend_application_config_provider_1 = require("../frontend-application-config-provider");
exports.InitialWindowTitleParts = {
    activeEditorShort: undefined,
    activeEditorMedium: undefined,
    activeEditorLong: undefined,
    activeFolderShort: undefined,
    activeFolderMedium: undefined,
    activeFolderLong: undefined,
    folderName: undefined,
    folderPath: undefined,
    rootName: undefined,
    rootPath: undefined,
    appName: frontend_application_config_provider_1.FrontendApplicationConfigProvider.get().applicationName,
    remoteName: undefined,
    dirty: undefined,
    developmentHost: undefined
};
let WindowTitleService = class WindowTitleService {
    constructor() {
        this._title = '';
        this.onDidChangeTitleEmitter = new event_1.Emitter();
        this.titleParts = new Map(Object.entries(exports.InitialWindowTitleParts));
        this.separator = ' - ';
    }
    init() {
        this.titleTemplate = this.preferences['window.title'];
        this.separator = this.preferences['window.titleSeparator'];
        this.updateTitle();
        this.preferences.onPreferenceChanged(e => {
            if (e.preferenceName === 'window.title') {
                this.titleTemplate = e.newValue;
                this.updateTitle();
            }
            else if (e.preferenceName === 'window.titleSeparator') {
                this.separator = e.newValue;
                this.updateTitle();
            }
        });
    }
    get onDidChangeTitle() {
        return this.onDidChangeTitleEmitter.event;
    }
    get title() {
        return this._title;
    }
    update(parts) {
        for (const [key, value] of Object.entries(parts)) {
            this.titleParts.set(key, value);
        }
        this.updateTitle();
    }
    updateTitle() {
        if (!this.titleTemplate) {
            this._title = '';
        }
        else {
            let title = this.titleTemplate;
            for (const [key, value] of this.titleParts.entries()) {
                if (key !== 'developmentHost') {
                    const label = `$\{${key}\}`;
                    const regex = new RegExp((0, strings_1.escapeRegExpCharacters)(label), 'g');
                    title = title.replace(regex, value !== null && value !== void 0 ? value : '');
                }
            }
            const separatedTitle = title.split('${separator}').filter(e => e.trim().length > 0);
            this._title = separatedTitle.join(this.separator);
        }
        const developmentHost = this.titleParts.get('developmentHost');
        if (developmentHost) {
            this._title = developmentHost + this.separator + this._title;
        }
        document.title = this._title || frontend_application_config_provider_1.FrontendApplicationConfigProvider.get().applicationName;
        this.onDidChangeTitleEmitter.fire(this._title);
    }
};
__decorate([
    (0, inversify_1.inject)(core_preferences_1.CorePreferences),
    __metadata("design:type", Object)
], WindowTitleService.prototype, "preferences", void 0);
__decorate([
    (0, inversify_1.postConstruct)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WindowTitleService.prototype, "init", null);
WindowTitleService = __decorate([
    (0, inversify_1.injectable)()
], WindowTitleService);
exports.WindowTitleService = WindowTitleService;
//# sourceMappingURL=window-title-service.js.map