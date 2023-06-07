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
exports.MenuCommandAdapterRegistryImpl = exports.MenuCommandExecutorImpl = exports.MenuCommandAdapterRegistry = exports.MenuCommandAdapter = exports.MenuCommandExecutor = void 0;
const inversify_1 = require("inversify");
const command_1 = require("../command");
const disposable_1 = require("../disposable");
exports.MenuCommandExecutor = Symbol('MenuCommandExecutor');
;
exports.MenuCommandAdapter = Symbol('MenuCommandAdapter');
exports.MenuCommandAdapterRegistry = Symbol('MenuCommandAdapterRegistry');
let MenuCommandExecutorImpl = class MenuCommandExecutorImpl {
    executeCommand(menuPath, command, ...commandArgs) {
        return this.delegate(menuPath, command, commandArgs, 'executeCommand');
    }
    isVisible(menuPath, command, ...commandArgs) {
        return this.delegate(menuPath, command, commandArgs, 'isVisible');
    }
    isEnabled(menuPath, command, ...commandArgs) {
        return this.delegate(menuPath, command, commandArgs, 'isEnabled');
    }
    isToggled(menuPath, command, ...commandArgs) {
        return this.delegate(menuPath, command, commandArgs, 'isToggled');
    }
    delegate(menuPath, command, commandArgs, method) {
        const adapter = this.adapterRegistry.getAdapterFor(menuPath, command, commandArgs);
        return (adapter
            ? adapter[method](menuPath, command, ...commandArgs)
            : this.commandRegistry[method](command, ...commandArgs));
    }
};
__decorate([
    (0, inversify_1.inject)(exports.MenuCommandAdapterRegistry),
    __metadata("design:type", Object)
], MenuCommandExecutorImpl.prototype, "adapterRegistry", void 0);
__decorate([
    (0, inversify_1.inject)(command_1.CommandRegistry),
    __metadata("design:type", command_1.CommandRegistry)
], MenuCommandExecutorImpl.prototype, "commandRegistry", void 0);
MenuCommandExecutorImpl = __decorate([
    (0, inversify_1.injectable)()
], MenuCommandExecutorImpl);
exports.MenuCommandExecutorImpl = MenuCommandExecutorImpl;
let MenuCommandAdapterRegistryImpl = class MenuCommandAdapterRegistryImpl {
    constructor() {
        this.adapters = new Array();
    }
    registerAdapter(adapter) {
        if (!this.adapters.includes(adapter)) {
            this.adapters.push(adapter);
            return disposable_1.Disposable.create(() => {
                const index = this.adapters.indexOf(adapter);
                if (index !== -1) {
                    this.adapters.splice(index, 1);
                }
            });
        }
        return disposable_1.Disposable.NULL;
    }
    getAdapterFor(menuPath, command, ...commandArgs) {
        let bestAdapter = undefined;
        let bestScore = 0;
        let currentScore = 0;
        for (const adapter of this.adapters) {
            // Greater than or equal: favor later registrations over earlier.
            if ((currentScore = adapter.canHandle(menuPath, command, ...commandArgs)) >= bestScore) {
                bestScore = currentScore;
                bestAdapter = adapter;
            }
        }
        return bestAdapter;
    }
};
MenuCommandAdapterRegistryImpl = __decorate([
    (0, inversify_1.injectable)()
], MenuCommandAdapterRegistryImpl);
exports.MenuCommandAdapterRegistryImpl = MenuCommandAdapterRegistryImpl;
//# sourceMappingURL=menu-adapter.js.map