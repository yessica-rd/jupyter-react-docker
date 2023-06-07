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
exports.LanguageQuickPickService = void 0;
const inversify_1 = require("inversify");
const nls_1 = require("../../common/nls");
const localization_1 = require("../../common/i18n/localization");
const quick_input_1 = require("../quick-input");
const window_service_1 = require("../window/window-service");
let LanguageQuickPickService = class LanguageQuickPickService {
    async pickDisplayLanguage() {
        const quickInput = this.quickInputService.createQuickPick();
        const installedItems = await this.getInstalledLanguages();
        const quickInputItems = [
            {
                type: 'separator',
                label: nls_1.nls.localizeByDefault('Installed')
            },
            ...installedItems
        ];
        quickInput.items = quickInputItems;
        quickInput.busy = true;
        const selected = installedItems.find(item => nls_1.nls.isSelectedLocale(item.languageId));
        if (selected) {
            quickInput.activeItems = [selected];
        }
        quickInput.placeholder = nls_1.nls.localizeByDefault('Configure Display Language');
        quickInput.show();
        this.getAvailableLanguages().then(availableItems => {
            if (availableItems.length > 0) {
                quickInputItems.push({
                    type: 'separator',
                    label: nls_1.nls.localizeByDefault('Available')
                });
                const installed = new Set(installedItems.map(e => e.languageId));
                for (const available of availableItems) {
                    // Exclude already installed languages
                    if (!installed.has(available.languageId)) {
                        quickInputItems.push(available);
                    }
                }
                quickInput.items = quickInputItems;
            }
        }).finally(() => {
            quickInput.busy = false;
        });
        return new Promise(resolve => {
            quickInput.onDidAccept(async () => {
                var _a;
                const selectedItem = quickInput.selectedItems[0];
                if (selectedItem) {
                    // Some language quick pick items want to install additional languages
                    // We have to await that before returning the selected locale
                    await ((_a = selectedItem.execute) === null || _a === void 0 ? void 0 : _a.call(selectedItem));
                    resolve(selectedItem);
                }
                else {
                    resolve(undefined);
                }
            });
            quickInput.onDidHide(() => {
                resolve(undefined);
            });
        });
    }
    async getInstalledLanguages() {
        const languageInfos = await this.localizationProvider.getAvailableLanguages();
        const items = [];
        const en = {
            languageId: 'en',
            languageName: 'English',
            localizedLanguageName: 'English'
        };
        languageInfos.push(en);
        for (const language of languageInfos.filter(e => !!e.languageId)) {
            items.push(this.createLanguageQuickPickItem(language));
        }
        return items;
    }
    async getAvailableLanguages() {
        return [];
    }
    createLanguageQuickPickItem(language) {
        let label;
        let description;
        const languageName = language.localizedLanguageName || language.languageName;
        const id = language.languageId;
        const idLabel = id + (nls_1.nls.isSelectedLocale(id) ? ` (${nls_1.nls.localizeByDefault('Current')})` : '');
        if (languageName) {
            label = languageName;
            description = idLabel;
        }
        else {
            label = idLabel;
        }
        return {
            label,
            description,
            languageId: id,
            languageName: language.languageName,
            localizedLanguageName: language.localizedLanguageName
        };
    }
};
__decorate([
    (0, inversify_1.inject)(quick_input_1.QuickInputService),
    __metadata("design:type", Object)
], LanguageQuickPickService.prototype, "quickInputService", void 0);
__decorate([
    (0, inversify_1.inject)(localization_1.AsyncLocalizationProvider),
    __metadata("design:type", Object)
], LanguageQuickPickService.prototype, "localizationProvider", void 0);
__decorate([
    (0, inversify_1.inject)(window_service_1.WindowService),
    __metadata("design:type", Object)
], LanguageQuickPickService.prototype, "windowService", void 0);
LanguageQuickPickService = __decorate([
    (0, inversify_1.injectable)()
], LanguageQuickPickService);
exports.LanguageQuickPickService = LanguageQuickPickService;
//# sourceMappingURL=language-quick-pick-service.js.map