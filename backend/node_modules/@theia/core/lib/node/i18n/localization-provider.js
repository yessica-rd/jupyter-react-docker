"use strict";
// *****************************************************************************
// Copyright (C) 2021 TypeFox and others.
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
exports.LocalizationProvider = void 0;
const inversify_1 = require("inversify");
const nls_1 = require("../../common/nls");
let LocalizationProvider = class LocalizationProvider {
    constructor() {
        this.localizations = [];
        this.currentLanguage = nls_1.nls.defaultLocale;
    }
    addLocalizations(...localizations) {
        this.localizations.push(...localizations);
    }
    removeLocalizations(...localizations) {
        for (const localization of localizations) {
            const index = this.localizations.indexOf(localization);
            if (index >= 0) {
                this.localizations.splice(index, 1);
            }
        }
    }
    setCurrentLanguage(languageId) {
        this.currentLanguage = languageId;
    }
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    getAvailableLanguages(all) {
        var _a;
        const languageInfos = new Map();
        for (const localization of this.localizations.values()) {
            if (all || localization.languagePack) {
                const languageInfo = (_a = languageInfos.get(localization.languageId)) !== null && _a !== void 0 ? _a : {
                    languageId: localization.languageId
                };
                languageInfo.languageName || (languageInfo.languageName = localization.languageName);
                languageInfo.localizedLanguageName || (languageInfo.localizedLanguageName = localization.localizedLanguageName);
                languageInfo.languagePack || (languageInfo.languagePack = localization.languagePack);
                languageInfos.set(localization.languageId, languageInfo);
            }
        }
        return Array.from(languageInfos.values()).sort((a, b) => a.languageId.localeCompare(b.languageId));
    }
    loadLocalization(languageId) {
        const merged = {
            languageId,
            translations: {}
        };
        for (const localization of this.localizations.filter(e => e.languageId === languageId)) {
            merged.languageName || (merged.languageName = localization.languageName);
            merged.localizedLanguageName || (merged.localizedLanguageName = localization.localizedLanguageName);
            merged.languagePack || (merged.languagePack = localization.languagePack);
            Object.assign(merged.translations, localization.translations);
        }
        return merged;
    }
};
LocalizationProvider = __decorate([
    (0, inversify_1.injectable)()
], LocalizationProvider);
exports.LocalizationProvider = LocalizationProvider;
//# sourceMappingURL=localization-provider.js.map