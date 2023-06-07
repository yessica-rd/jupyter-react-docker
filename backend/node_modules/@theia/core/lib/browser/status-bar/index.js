"use strict";
// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindStatusBar = void 0;
const status_bar_1 = require("./status-bar");
const status_bar_types_1 = require("./status-bar-types");
const status_bar_view_model_1 = require("./status-bar-view-model");
__exportStar(require("./status-bar"), exports);
__exportStar(require("./status-bar-types"), exports);
__exportStar(require("./status-bar-view-model"), exports);
function bindStatusBar(bind) {
    bind(status_bar_1.StatusBarImpl).toSelf().inSingletonScope();
    bind(status_bar_types_1.StatusBar).to(status_bar_1.StatusBarImpl).inSingletonScope();
    bind(status_bar_view_model_1.StatusBarViewModel).toSelf().inSingletonScope();
}
exports.bindStatusBar = bindStatusBar;
//# sourceMappingURL=index.js.map