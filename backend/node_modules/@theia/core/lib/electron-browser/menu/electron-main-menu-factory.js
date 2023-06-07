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
exports.ElectronMainMenuFactory = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const inversify_1 = require("inversify");
const common_1 = require("../../common");
const browser_1 = require("../../browser");
const debounce = require("lodash.debounce");
const theia_dock_panel_1 = require("../../browser/shell/theia-dock-panel");
const browser_menu_plugin_1 = require("../../browser/menu/browser-menu-plugin");
let ElectronMainMenuFactory = class ElectronMainMenuFactory extends browser_menu_plugin_1.BrowserMainMenuFactory {
    constructor() {
        super(...arguments);
        this._toggledCommands = new Set();
    }
    postConstruct() {
        this.preferencesService.onPreferenceChanged(debounce(e => {
            if (e.preferenceName === 'window.menuBarVisibility') {
                this.setMenuBar();
            }
            if (this._menu) {
                for (const cmd of this._toggledCommands) {
                    const menuItem = this.findMenuById(this._menu, cmd);
                    if (menuItem) {
                        menuItem.checked = this.commandRegistry.isToggled(cmd);
                    }
                }
                window.electronTheiaCore.setMenu(this._menu);
            }
        }, 10));
        this.keybindingRegistry.onKeybindingsChanged(() => {
            this.setMenuBar();
        });
    }
    async setMenuBar() {
        await this.preferencesService.ready;
        const createdMenuBar = this.createElectronMenuBar();
        window.electronTheiaCore.setMenu(createdMenuBar);
    }
    createElectronMenuBar() {
        const preference = this.preferencesService.get('window.menuBarVisibility') || 'classic';
        const maxWidget = document.getElementsByClassName(theia_dock_panel_1.MAXIMIZED_CLASS);
        if (preference === 'visible' || (preference === 'classic' && maxWidget.length === 0)) {
            const menuModel = this.menuProvider.getMenu(common_1.MAIN_MENU_BAR);
            this._menu = this.fillMenuTemplate([], menuModel, [], { honorDisabled: false, rootMenuPath: common_1.MAIN_MENU_BAR });
            if (common_1.isOSX) {
                this._menu.unshift(this.createOSXMenu());
            }
            return this._menu;
        }
        this._menu = undefined;
        // eslint-disable-next-line no-null/no-null
        return undefined;
    }
    createElectronContextMenu(menuPath, args, context, contextKeyService) {
        const menuModel = this.menuProvider.getMenu(menuPath);
        return this.fillMenuTemplate([], menuModel, args, { showDisabled: true, context, rootMenuPath: menuPath, contextKeyService });
    }
    fillMenuTemplate(parentItems, menu, args = [], options) {
        var _a, _b;
        const showDisabled = (options === null || options === void 0 ? void 0 : options.showDisabled) !== false;
        const honorDisabled = (options === null || options === void 0 ? void 0 : options.honorDisabled) !== false;
        if (common_1.CompoundMenuNode.is(menu) && menu.children.length && this.undefinedOrMatch((_a = options.contextKeyService) !== null && _a !== void 0 ? _a : this.contextKeyService, menu.when, options.context)) {
            const role = common_1.CompoundMenuNode.getRole(menu);
            if (role === 1 /* Group */ && menu.id === 'inline') {
                return parentItems;
            }
            const children = common_1.CompoundMenuNode.getFlatChildren(menu.children);
            const myItems = [];
            children.forEach(child => this.fillMenuTemplate(myItems, child, args, options));
            if (myItems.length === 0) {
                return parentItems;
            }
            if (role === 0 /* Submenu */) {
                parentItems.push({ label: menu.label, submenu: myItems });
            }
            else if (role === 1 /* Group */ && menu.id !== 'inline') {
                if (parentItems.length && parentItems[parentItems.length - 1].type !== 'separator') {
                    parentItems.push({ type: 'separator' });
                }
                parentItems.push(...myItems);
                parentItems.push({ type: 'separator' });
            }
        }
        else if (menu.command) {
            const node = menu.altNode && this.context.altPressed ? menu.altNode : menu;
            const commandId = node.command;
            // That is only a sanity check at application startup.
            if (!this.commandRegistry.getCommand(commandId)) {
                console.debug(`Skipping menu item with missing command: "${commandId}".`);
                return parentItems;
            }
            if (!this.menuCommandExecutor.isVisible(options.rootMenuPath, commandId, ...args)
                || !this.undefinedOrMatch((_b = options.contextKeyService) !== null && _b !== void 0 ? _b : this.contextKeyService, node.when, options.context)) {
                return parentItems;
            }
            // We should omit rendering context-menu items which are disabled.
            if (!showDisabled && !this.menuCommandExecutor.isEnabled(options.rootMenuPath, commandId, ...args)) {
                return parentItems;
            }
            const bindings = this.keybindingRegistry.getKeybindingsForCommand(commandId);
            const accelerator = bindings[0] && this.acceleratorFor(bindings[0]);
            const menuItem = {
                id: node.id,
                label: node.label,
                type: this.commandRegistry.getToggledHandler(commandId, ...args) ? 'checkbox' : 'normal',
                checked: this.commandRegistry.isToggled(commandId, ...args),
                enabled: !honorDisabled || this.commandRegistry.isEnabled(commandId, ...args),
                visible: true,
                accelerator,
                execute: () => this.execute(commandId, args, options.rootMenuPath)
            };
            if (common_1.isOSX) {
                const role = this.roleFor(node.id);
                if (role) {
                    menuItem.role = role;
                    delete menuItem.execute;
                }
            }
            parentItems.push(menuItem);
            if (this.commandRegistry.getToggledHandler(commandId, ...args)) {
                this._toggledCommands.add(commandId);
            }
        }
        return parentItems;
    }
    undefinedOrMatch(contextKeyService, expression, context) {
        if (expression) {
            return contextKeyService.match(expression, context);
        }
        return true;
    }
    /**
     * Return a user visible representation of a keybinding.
     */
    acceleratorFor(keybinding) {
        const bindingKeySequence = this.keybindingRegistry.resolveKeybinding(keybinding);
        // FIXME see https://github.com/electron/electron/issues/11740
        // Key Sequences can't be represented properly in the electron menu.
        //
        // We can do what VS Code does, and append the chords as a suffix to the menu label.
        // https://github.com/eclipse-theia/theia/issues/1199#issuecomment-430909480
        if (bindingKeySequence.length > 1) {
            return '';
        }
        const keyCode = bindingKeySequence[0];
        return this.keybindingRegistry.acceleratorForKeyCode(keyCode, '+', true);
    }
    roleFor(id) {
        let role;
        switch (id) {
            case browser_1.CommonCommands.UNDO.id:
                role = 'undo';
                break;
            case browser_1.CommonCommands.REDO.id:
                role = 'redo';
                break;
            case browser_1.CommonCommands.CUT.id:
                role = 'cut';
                break;
            case browser_1.CommonCommands.COPY.id:
                role = 'copy';
                break;
            case browser_1.CommonCommands.PASTE.id:
                role = 'paste';
                break;
            case browser_1.CommonCommands.SELECT_ALL.id:
                role = 'selectAll';
                break;
            default:
                break;
        }
        return role;
    }
    async execute(cmd, args, menuPath) {
        try {
            // This is workaround for https://github.com/eclipse-theia/theia/issues/446.
            // Electron menus do not update based on the `isEnabled`, `isVisible` property of the command.
            // We need to check if we can execute it.
            if (this.menuCommandExecutor.isEnabled(menuPath, cmd, ...args)) {
                await this.menuCommandExecutor.executeCommand(menuPath, cmd, ...args);
                if (this._menu && this.menuCommandExecutor.isVisible(menuPath, cmd, ...args)) {
                    const item = this.findMenuById(this._menu, cmd);
                    if (item) {
                        item.checked = this.menuCommandExecutor.isToggled(menuPath, cmd, ...args);
                        window.electronTheiaCore.setMenu(this._menu);
                    }
                }
            }
        }
        catch (_a) {
            // no-op
        }
    }
    findMenuById(items, id) {
        for (const item of items) {
            if (item.id === id) {
                return item;
            }
            if (item.submenu) {
                const found = this.findMenuById(item.submenu, id);
                if (found) {
                    return found;
                }
            }
        }
        return undefined;
    }
    createOSXMenu() {
        return {
            label: 'Theia',
            submenu: [
                {
                    role: 'about'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'services',
                    submenu: []
                },
                {
                    type: 'separator'
                },
                {
                    role: 'hide'
                },
                {
                    role: 'hideOthers'
                },
                {
                    role: 'unhide'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'quit'
                }
            ]
        };
    }
};
__decorate([
    (0, inversify_1.inject)(browser_1.PreferenceService),
    __metadata("design:type", Object)
], ElectronMainMenuFactory.prototype, "preferencesService", void 0);
__decorate([
    (0, inversify_1.postConstruct)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ElectronMainMenuFactory.prototype, "postConstruct", null);
ElectronMainMenuFactory = __decorate([
    (0, inversify_1.injectable)()
], ElectronMainMenuFactory);
exports.ElectronMainMenuFactory = ElectronMainMenuFactory;
//# sourceMappingURL=electron-main-menu-factory.js.map