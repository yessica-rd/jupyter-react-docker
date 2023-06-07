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
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const disposable_1 = require("./disposable");
describe('Disposables', () => {
    it('Is safe to use Disposable.NULL', () => {
        const collectionA = new disposable_1.DisposableCollection(disposable_1.Disposable.NULL);
        const collectionB = new disposable_1.DisposableCollection(disposable_1.Disposable.NULL);
        (0, chai_1.expect)(!collectionA.disposed && !collectionB.disposed, 'Neither should be disposed before either is disposed.').to.be.true;
        collectionA.dispose();
        (0, chai_1.expect)(collectionA.disposed, 'A should be disposed after being disposed.').to.be.true;
        (0, chai_1.expect)(collectionB.disposed, 'B should not be disposed because A was disposed.').to.be.false;
    });
});
//# sourceMappingURL=disposable.spec.js.map