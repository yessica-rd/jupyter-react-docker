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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneAndChange = exports.isEmpty = exports.notEmpty = exports.deepFreeze = exports.deepClone = void 0;
const types_1 = require("./types");
function deepClone(obj) {
    if (!(0, types_1.isObject)(obj)) {
        return obj;
    }
    if (obj instanceof RegExp) {
        return obj;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = Array.isArray(obj) ? [] : {};
    Object.keys(obj).forEach((key) => {
        const prop = obj[key];
        if ((0, types_1.isObject)(prop)) {
            result[key] = deepClone(prop);
        }
        else {
            result[key] = prop;
        }
    });
    return result;
}
exports.deepClone = deepClone;
function deepFreeze(obj) {
    if (!(0, types_1.isObject)(obj)) {
        return obj;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stack = [obj];
    while (stack.length > 0) {
        const objectToFreeze = stack.shift();
        Object.freeze(objectToFreeze);
        for (const key in objectToFreeze) {
            if (_hasOwnProperty.call(objectToFreeze, key)) {
                const prop = objectToFreeze[key];
                if ((0, types_1.isObject)(prop) && !Object.isFrozen(prop)) {
                    stack.push(prop);
                }
            }
        }
    }
    return obj;
}
exports.deepFreeze = deepFreeze;
const _hasOwnProperty = Object.prototype.hasOwnProperty;
function notEmpty(arg) {
    // eslint-disable-next-line no-null/no-null
    return arg !== undefined && arg !== null;
}
exports.notEmpty = notEmpty;
/**
 * `true` if the argument is an empty object. Otherwise, `false`.
 */
function isEmpty(arg) {
    return Object.keys(arg).length === 0 && arg.constructor === Object;
}
exports.isEmpty = isEmpty;
// copied and modified from https://github.com/microsoft/vscode/blob/1.76.0/src/vs/base/common/objects.ts#L45-L83
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cloneAndChange(obj, changer, seen) {
    // impossible to clone an undefined or null object
    // eslint-disable-next-line no-null/no-null
    if ((0, types_1.isUndefined)(obj) || obj === null) {
        return obj;
    }
    const changed = changer(obj);
    if (!(0, types_1.isUndefined)(changed)) {
        return changed;
    }
    if (Array.isArray(obj)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const r1 = [];
        for (const e of obj) {
            r1.push(cloneAndChange(e, changer, seen));
        }
        return r1;
    }
    if ((0, types_1.isObject)(obj)) {
        if (seen.has(obj)) {
            throw new Error('Cannot clone recursive data-structure');
        }
        seen.add(obj);
        const r2 = {};
        for (const i2 in obj) {
            if (_hasOwnProperty.call(obj, i2)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                r2[i2] = cloneAndChange(obj[i2], changer, seen);
            }
        }
        seen.delete(obj);
        return r2;
    }
    return obj;
}
exports.cloneAndChange = cloneAndChange;
//# sourceMappingURL=objects.js.map