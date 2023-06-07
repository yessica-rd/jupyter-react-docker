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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectronContextMenuRenderer = exports.ElectronTextInputContextMenuContribution = exports.ElectronTextInputContextMenu = exports.ElectronContextMenuAccess = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const inversify_1 = require("inversify");
const browser_1 = require("../../browser");
const electron_main_menu_factory_1 = require("./electron-main-menu-factory");
const context_menu_context_1 = require("../../browser/menu/context-menu-context");
const browser_context_menu_renderer_1 = require("../../browser/menu/browser-context-menu-renderer");
class ElectronContextMenuAccess extends browser_1.ContextMenuAccess {
    constructor(menuHandle) {
        super({
            dispose: () => menuHandle.then(handle => window.electronTheiaCore.closePopup(handle))
        });
        this.menuHandle = menuHandle;
    }
}
exports.ElectronContextMenuAccess = ElectronContextMenuAccess;
var ElectronTextInputContextMenu;
(function (ElectronTextInputContextMenu) {
    ElectronTextInputContextMenu.MENU_PATH = ['electron_text_input'];
    ElectronTextInputContextMenu.UNDO_REDO_EDIT_GROUP = [...ElectronTextInputContextMenu.MENU_PATH, '0_undo_redo_group'];
    ElectronTextInputContextMenu.EDIT_GROUP = [...ElectronTextInputContextMenu.MENU_PATH, '1_edit_group'];
    ElectronTextInputContextMenu.SELECT_GROUP = [...ElectronTextInputContextMenu.MENU_PATH, '2_select_group'];
})(ElectronTextInputContextMenu = exports.ElectronTextInputContextMenu || (exports.ElectronTextInputContextMenu = {}));
let ElectronTextInputContextMenuContribution = class ElectronTextInputContextMenuContribution {
    onStart() {
        window.document.addEventListener('contextmenu', event => {
            if (event.target instanceof HTMLElement) {
                const target = event.target;
                if (target.nodeName && (target.nodeName.toLowerCase() === 'input' || target.nodeName.toLowerCase() === 'textarea')) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.contextMenuRenderer.render({
                        anchor: event,
                        menuPath: ElectronTextInputContextMenu.MENU_PATH,
                        onHide: () => target.focus()
                    });
                }
            }
        });
    }
    registerMenus(registry) {
        registry.registerMenuAction(ElectronTextInputContextMenu.UNDO_REDO_EDIT_GROUP, { commandId: browser_1.CommonCommands.UNDO.id });
        registry.registerMenuAction(ElectronTextInputContextMenu.UNDO_REDO_EDIT_GROUP, { commandId: browser_1.CommonCommands.REDO.id });
        registry.registerMenuAction(ElectronTextInputContextMenu.EDIT_GROUP, { commandId: browser_1.CommonCommands.CUT.id });
        registry.registerMenuAction(ElectronTextInputContextMenu.EDIT_GROUP, { commandId: browser_1.CommonCommands.COPY.id });
        registry.registerMenuAction(ElectronTextInputContextMenu.EDIT_GROUP, { commandId: browser_1.CommonCommands.PASTE.id });
        registry.registerMenuAction(ElectronTextInputContextMenu.SELECT_GROUP, { commandId: browser_1.CommonCommands.SELECT_ALL.id });
    }
};
__decorate([
    (0, inversify_1.inject)(browser_1.ContextMenuRenderer),
    __metadata("design:type", browser_1.ContextMenuRenderer)
], ElectronTextInputContextMenuContribution.prototype, "contextMenuRenderer", void 0);
ElectronTextInputContextMenuContribution = __decorate([
    (0, inversify_1.injectable)()
], ElectronTextInputContextMenuContribution);
exports.ElectronTextInputContextMenuContribution = ElectronTextInputContextMenuContribution;
let ElectronContextMenuRenderer = class ElectronContextMenuRenderer extends browser_context_menu_renderer_1.BrowserContextMenuRenderer {
    constructor(electronMenuFactory) {
        super(electronMenuFactory);
        this.electronMenuFactory = electronMenuFactory;
        this.useNativeStyle = true;
    }
    async init() {
        this.useNativeStyle = await window.electronTheiaCore.getTitleBarStyleAtStartup() === 'native';
    }
    doRender(options) {
        if (this.useNativeStyle) {
            const { menuPath, anchor, args, onHide, context, contextKeyService } = options;
            const menu = this.electronMenuFactory.createElectronContextMenu(menuPath, args, context, contextKeyService);
            const { x, y } = (0, browser_1.coordinateFromAnchor)(anchor);
            const menuHandle = window.electronTheiaCore.popup(menu, x, y, () => {
                if (onHide) {
                    onHide();
                }
            });
            // native context menu stops the event loop, so there is no keyboard events
            this.context.resetAltPressed();
            return new ElectronContextMenuAccess(menuHandle);
        }
        else {
            return super.doRender(options);
        }
    }
};
__decorate([
    (0, inversify_1.inject)(context_menu_context_1.ContextMenuContext),
    __metadata("design:type", context_menu_context_1.ContextMenuContext)
], ElectronContextMenuRenderer.prototype, "context", void 0);
__decorate([
    (0, inversify_1.inject)(browser_1.PreferenceService),
    __metadata("design:type", Object)
], ElectronContextMenuRenderer.prototype, "preferenceService", void 0);
__decorate([
    (0, inversify_1.postConstruct)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ElectronContextMenuRenderer.prototype, "init", null);
ElectronContextMenuRenderer = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(electron_main_menu_factory_1.ElectronMainMenuFactory)),
    __metadata("design:paramtypes", [electron_main_menu_factory_1.ElectronMainMenuFactory])
], ElectronContextMenuRenderer);
exports.ElectronContextMenuRenderer = ElectronContextMenuRenderer;
//# sourceMappingURL=electron-context-menu-renderer.js.map