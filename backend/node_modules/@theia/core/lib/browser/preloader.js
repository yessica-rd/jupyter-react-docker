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
Object.defineProperty(exports, "__esModule", { value: true });
exports.preload = void 0;
const nls_1 = require("../common/nls");
const endpoint_1 = require("./endpoint");
const os_1 = require("../common/os");
const frontend_application_config_provider_1 = require("./frontend-application-config-provider");
function fetchFrom(path) {
    const endpoint = new endpoint_1.Endpoint({ path }).getRestUrl().toString();
    return fetch(endpoint);
}
async function loadTranslations() {
    const defaultLocale = frontend_application_config_provider_1.FrontendApplicationConfigProvider.get().defaultLocale;
    if (defaultLocale && !nls_1.nls.locale) {
        Object.assign(nls_1.nls, {
            locale: defaultLocale
        });
    }
    if (nls_1.nls.locale) {
        const response = await fetchFrom(`/i18n/${nls_1.nls.locale}`);
        const localization = await response.json();
        if (localization.languagePack) {
            nls_1.nls.localization = localization;
        }
        else {
            // In case the localization that we've loaded doesn't localize Theia completely (languagePack is false)
            // We simply reset the locale to the default again
            Object.assign(nls_1.nls, {
                locale: defaultLocale || undefined
            });
        }
    }
}
async function loadBackendOS() {
    const response = await fetchFrom('/os');
    const osType = await response.text();
    const isWindows = osType === 'Windows';
    const isOSX = osType === 'OSX';
    os_1.OS.backend.isOSX = isOSX;
    os_1.OS.backend.isWindows = isWindows;
    os_1.OS.backend.type = () => osType;
}
function initBackground() {
    // The default light background color is based on the `colors#editor.background` value from
    // `packages/monaco/data/monaco-themes/vscode/dark_vs.json` and the dark background comes from the `light_vs.json`.
    const dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const value = window.localStorage.getItem(frontend_application_config_provider_1.DEFAULT_BACKGROUND_COLOR_STORAGE_KEY) || (dark ? '#1E1E1E' : '#FFFFFF');
    const documentElement = document.documentElement;
    documentElement.style.setProperty('--theia-editor-background', value);
}
async function preload() {
    await Promise.allSettled([
        loadTranslations(),
        loadBackendOS(),
        initBackground(),
    ]);
}
exports.preload = preload;
//# sourceMappingURL=preloader.js.map