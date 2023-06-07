"use strict";
// *****************************************************************************
// Copyright (C) 2017 Ericsson and others.
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
exports.MockLogger = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const inversify_1 = require("inversify");
let MockLogger = class MockLogger {
    setLogLevel(logLevel) {
        return Promise.resolve();
    }
    getLogLevel() {
        return Promise.resolve(0);
    }
    isEnabled(logLevel) {
        return Promise.resolve(true);
    }
    ifEnabled(logLevel) {
        return Promise.resolve();
    }
    log(logLevel, arg2, ...params) {
        return Promise.resolve();
    }
    isTrace() {
        return Promise.resolve(true);
    }
    ifTrace() {
        return Promise.resolve();
    }
    trace(arg, ...params) {
        return Promise.resolve();
    }
    isDebug() {
        return Promise.resolve(true);
    }
    ifDebug() {
        return Promise.resolve();
    }
    debug(arg, ...params) {
        return Promise.resolve();
    }
    isInfo() {
        return Promise.resolve(true);
    }
    ifInfo() {
        return Promise.resolve();
    }
    info(arg, ...params) {
        return Promise.resolve();
    }
    isWarn() {
        return Promise.resolve(true);
    }
    ifWarn() {
        return Promise.resolve();
    }
    warn(arg, ...params) {
        return Promise.resolve();
    }
    isError() {
        return Promise.resolve(true);
    }
    ifError() {
        return Promise.resolve();
    }
    error(arg, ...params) {
        return Promise.resolve();
    }
    isFatal() {
        return Promise.resolve(true);
    }
    ifFatal() {
        return Promise.resolve();
    }
    fatal(arg, ...params) {
        return Promise.resolve();
    }
    child(obj) {
        return this;
    }
};
MockLogger = __decorate([
    (0, inversify_1.injectable)()
], MockLogger);
exports.MockLogger = MockLogger;
//# sourceMappingURL=mock-logger.js.map