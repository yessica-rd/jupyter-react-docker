"use strict";
// *****************************************************************************
// Copyright (C) 2017 TypeFox and others.
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
const command_1 = require("../command");
const menu_model_registry_1 = require("./menu-model-registry");
const chai = require("chai");
const expect = chai.expect;
describe('menu-model-registry', () => {
    describe('01 #register', () => {
        it('Should allow to register menu actions.', () => {
            const fileMenu = ['main', 'File'];
            const fileOpenMenu = [...fileMenu, '0_open'];
            const service = createMenuRegistry({
                registerMenus(menuRegistry) {
                    menuRegistry.registerSubmenu(fileMenu, 'File');
                    menuRegistry.registerMenuAction(fileOpenMenu, {
                        commandId: 'open'
                    });
                    menuRegistry.registerMenuAction(fileOpenMenu, {
                        commandId: 'open.with'
                    });
                }
            }, {
                registerCommands(reg) {
                    reg.registerCommand({
                        id: 'open',
                        label: 'A'
                    });
                    reg.registerCommand({
                        id: 'open.with',
                        label: 'B'
                    });
                }
            });
            const all = service.getMenu();
            const main = all.children[0];
            expect(main.children.length).equals(1);
            expect(main.id, 'main');
            expect(all.children.length).equals(1);
            const file = main.children[0];
            expect(file.children.length).equals(1);
            expect(file.label, 'File');
            const openGroup = file.children[0];
            expect(openGroup.children.length).equals(2);
            expect(openGroup.label).undefined;
        });
    });
});
function createMenuRegistry(menuContrib, commandContrib) {
    const cmdReg = new command_1.CommandRegistry({ getContributions: () => [commandContrib] });
    cmdReg.onStart();
    const menuReg = new menu_model_registry_1.MenuModelRegistry({ getContributions: () => [menuContrib] }, cmdReg);
    menuReg.onStart();
    return menuReg;
}
//# sourceMappingURL=menu.spec.js.map