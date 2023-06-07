"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// *****************************************************************************
// Copyright (C) 2021 Red Hat and others.
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
const assert = require("assert");
const promise_util_1 = require("./promise-util");
const event_1 = require("./event");
describe('promise-util', () => {
    it('should time out', async () => {
        const emitter = new event_1.Emitter();
        try {
            await (0, promise_util_1.waitForEvent)(emitter.event, 1000);
            assert.fail('did not time out');
        }
        catch (e) {
            // OK
        }
    });
    describe('promise-util', () => {
        it('should get event', async () => {
            const emitter = new event_1.Emitter();
            setTimeout(() => {
                emitter.fire('abcd');
            }, 500);
            assert.strictEqual(await (0, promise_util_1.waitForEvent)(emitter.event, 1000), 'abcd');
        });
    });
});
//# sourceMappingURL=promise-util.spec.js.map