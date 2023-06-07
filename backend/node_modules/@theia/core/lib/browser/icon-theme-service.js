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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconThemeService = exports.NoneIconTheme = void 0;
const inversify_1 = require("inversify");
const event_1 = require("../common/event");
const disposable_1 = require("../common/disposable");
const frontend_application_config_provider_1 = require("./frontend-application-config-provider");
const preferences_1 = require("./preferences");
const debounce = require("lodash.debounce");
const ICON_THEME_PREFERENCE_KEY = 'workbench.iconTheme';
let NoneIconTheme = class NoneIconTheme {
    constructor() {
        this.id = 'none';
        this.label = 'None';
        this.description = 'Disable file icons';
        this.hasFileIcons = true;
        this.hasFolderIcons = true;
        this.onDidChangeEmitter = new event_1.Emitter();
        this.onDidChange = this.onDidChangeEmitter.event;
        this.toDeactivate = new disposable_1.DisposableCollection();
    }
    activate() {
        if (this.toDeactivate.disposed) {
            this.toDeactivate.push(disposable_1.Disposable.create(() => this.fireDidChange()));
            this.fireDidChange();
        }
        return this.toDeactivate;
    }
    fireDidChange() {
        this.onDidChangeEmitter.fire({ affects: () => true });
    }
    canHandle() {
        if (this.toDeactivate.disposed) {
            return 0;
        }
        return Number.MAX_SAFE_INTEGER - 1024;
    }
    getIcon() {
        return '';
    }
};
NoneIconTheme = __decorate([
    (0, inversify_1.injectable)()
], NoneIconTheme);
exports.NoneIconTheme = NoneIconTheme;
let IconThemeService = class IconThemeService {
    constructor() {
        this.onDidChangeEmitter = new event_1.Emitter();
        this.onDidChange = this.onDidChangeEmitter.event;
        this._iconThemes = new Map();
        this.onDidChangeCurrentEmitter = new event_1.Emitter();
        this.onDidChangeCurrent = this.onDidChangeCurrentEmitter.event;
        this.toDeactivate = new disposable_1.DisposableCollection();
        this.updateIconThemePreference = debounce(() => this.doUpdateIconThemePreference(), 500);
    }
    get ids() {
        return this._iconThemes.keys();
    }
    get definitions() {
        return this._iconThemes.values();
    }
    getDefinition(id) {
        return this._iconThemes.get(id);
    }
    init() {
        this.register(this.fallback);
        this.setCurrent(this.fallback, false);
        this.preferences.ready.then(() => {
            this.validateActiveTheme();
            this.updateIconThemePreference();
            this.preferences.onPreferencesChanged(changes => {
                if (ICON_THEME_PREFERENCE_KEY in changes) {
                    this.validateActiveTheme();
                }
            });
        });
    }
    register(iconTheme) {
        if (this._iconThemes.has(iconTheme.id)) {
            console.warn(new Error(`Icon theme '${iconTheme.id}' has already been registered, skipping.`));
            return disposable_1.Disposable.NULL;
        }
        this._iconThemes.set(iconTheme.id, iconTheme);
        this.onDidChangeEmitter.fire(undefined);
        this.validateActiveTheme();
        this.updateIconThemePreference();
        return disposable_1.Disposable.create(() => {
            this.unregister(iconTheme.id);
            this.updateIconThemePreference();
        });
    }
    unregister(id) {
        const iconTheme = this._iconThemes.get(id);
        if (!iconTheme) {
            return undefined;
        }
        this._iconThemes.delete(id);
        this.onDidChangeEmitter.fire(undefined);
        if (id === this.getCurrent().id) {
            this.setCurrent(this.default, false);
        }
        return iconTheme;
    }
    get current() {
        return this.getCurrent().id;
    }
    set current(id) {
        const newCurrent = this._iconThemes.get(id);
        if (newCurrent && this.getCurrent().id !== newCurrent.id) {
            this.setCurrent(newCurrent);
        }
    }
    getCurrent() {
        return this.activeTheme;
    }
    /**
     * @param persistSetting If `true`, the theme's id will be set as the value of the `workbench.iconTheme` preference. (default: `true`)
     */
    setCurrent(newCurrent, persistSetting = true) {
        if (newCurrent !== this.getCurrent()) {
            this.activeTheme = newCurrent;
            this.toDeactivate.dispose();
            this.toDeactivate.push(newCurrent.activate());
            this.onDidChangeCurrentEmitter.fire(newCurrent.id);
        }
        if (persistSetting) {
            this.preferences.updateValue(ICON_THEME_PREFERENCE_KEY, newCurrent.id);
        }
    }
    getConfiguredTheme() {
        const configuredId = this.preferences.get(ICON_THEME_PREFERENCE_KEY);
        return configuredId ? this._iconThemes.get(configuredId) : undefined;
    }
    validateActiveTheme() {
        if (this.preferences.isReady) {
            const configured = this.getConfiguredTheme();
            if (configured && configured !== this.getCurrent()) {
                this.setCurrent(configured, false);
            }
        }
    }
    doUpdateIconThemePreference() {
        const preference = this.schemaProvider.getSchemaProperty(ICON_THEME_PREFERENCE_KEY);
        if (preference) {
            const sortedThemes = Array.from(this.definitions).sort((a, b) => a.label.localeCompare(b.label));
            this.schemaProvider.updateSchemaProperty(ICON_THEME_PREFERENCE_KEY, Object.assign(Object.assign({}, preference), { enum: sortedThemes.map(e => e.id), enumItemLabels: sortedThemes.map(e => e.label) }));
        }
    }
    get default() {
        return this._iconThemes.get(frontend_application_config_provider_1.FrontendApplicationConfigProvider.get().defaultIconTheme) || this.fallback;
    }
    get fallback() {
        return this.noneIconTheme;
    }
};
IconThemeService.STORAGE_KEY = 'iconTheme';
__decorate([
    (0, inversify_1.inject)(NoneIconTheme),
    __metadata("design:type", NoneIconTheme)
], IconThemeService.prototype, "noneIconTheme", void 0);
__decorate([
    (0, inversify_1.inject)(preferences_1.PreferenceService),
    __metadata("design:type", Object)
], IconThemeService.prototype, "preferences", void 0);
__decorate([
    (0, inversify_1.inject)(preferences_1.PreferenceSchemaProvider),
    __metadata("design:type", preferences_1.PreferenceSchemaProvider)
], IconThemeService.prototype, "schemaProvider", void 0);
__decorate([
    (0, inversify_1.postConstruct)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IconThemeService.prototype, "init", null);
IconThemeService = __decorate([
    (0, inversify_1.injectable)()
], IconThemeService);
exports.IconThemeService = IconThemeService;
//# sourceMappingURL=icon-theme-service.js.map