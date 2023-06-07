"use strict";
// *****************************************************************************
// Copyright (C) 2018 Ericsson and others.
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
exports.MockPreferenceService = void 0;
const inversify_1 = require("inversify");
const common_1 = require("../../../common");
let MockPreferenceService = class MockPreferenceService {
    constructor() {
        this.ready = Promise.resolve();
        this.isReady = true;
        this.onPreferenceChanged = new common_1.Emitter().event;
        this.onPreferencesChanged = new common_1.Emitter().event;
    }
    dispose() { }
    get(preferenceName, defaultValue, resourceUri) {
        return undefined;
    }
    resolve(preferenceName, defaultValue, resourceUri) {
        return {};
    }
    inspect(preferenceName, resourceUri) {
        return undefined;
    }
    inspectInScope(preferenceName, scope, resourceUri, forceLanguageOverride) {
        return undefined;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set(preferenceName, value) { return Promise.resolve(); }
    updateValue() { return Promise.resolve(); }
    overridePreferenceName(options) {
        return options.preferenceName;
    }
    overriddenPreferenceName(preferenceName) {
        return undefined;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validate(name, value) { return true; }
    getConfigUri(scope, resourceUri) { return undefined; }
};
MockPreferenceService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], MockPreferenceService);
exports.MockPreferenceService = MockPreferenceService;
//# sourceMappingURL=mock-preference-service.js.map