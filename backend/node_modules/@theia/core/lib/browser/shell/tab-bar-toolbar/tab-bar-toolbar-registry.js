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
exports.TabBarToolbarRegistry = exports.TabBarToolbarContribution = void 0;
const debounce = require("lodash.debounce");
const inversify_1 = require("inversify");
// eslint-disable-next-line max-len
const common_1 = require("../../../common");
const context_key_service_1 = require("../../context-key-service");
const tab_bar_toolbar_types_1 = require("./tab-bar-toolbar-types");
const tab_bar_toolbar_menu_adapters_1 = require("./tab-bar-toolbar-menu-adapters");
/**
 * Clients should implement this interface if they want to contribute to the tab-bar toolbar.
 */
exports.TabBarToolbarContribution = Symbol('TabBarToolbarContribution');
function yes() { return true; }
const menuDelegateSeparator = '=@=';
/**
 * Main, shared registry for tab-bar toolbar items.
 */
let TabBarToolbarRegistry = class TabBarToolbarRegistry {
    constructor() {
        this.items = new Map();
        this.menuDelegates = new Map();
        this.onDidChangeEmitter = new common_1.Emitter();
        this.onDidChange = this.onDidChangeEmitter.event;
        // debounce in order to avoid to fire more than once in the same tick
        this.fireOnDidChange = debounce(() => this.onDidChangeEmitter.fire(undefined), 0);
    }
    onStart() {
        const contributions = this.contributionProvider.getContributions();
        for (const contribution of contributions) {
            contribution.registerToolbarItems(this);
        }
    }
    /**
     * Registers the given item. Throws an error, if the corresponding command cannot be found or an item has been already registered for the desired command.
     *
     * @param item the item to register.
     */
    registerItem(item) {
        const { id } = item;
        if (this.items.has(id)) {
            throw new Error(`A toolbar item is already registered with the '${id}' ID.`);
        }
        this.items.set(id, item);
        this.fireOnDidChange();
        const toDispose = new common_1.DisposableCollection(common_1.Disposable.create(() => this.fireOnDidChange()), common_1.Disposable.create(() => this.items.delete(id)));
        if (item.onDidChange) {
            toDispose.push(item.onDidChange(() => this.fireOnDidChange()));
        }
        return toDispose;
    }
    /**
     * Returns an array of tab-bar toolbar items which are visible when the `widget` argument is the current one.
     *
     * By default returns with all items where the command is enabled and `item.isVisible` is `true`.
     */
    visibleItems(widget) {
        if (widget.isDisposed) {
            return [];
        }
        const result = [];
        for (const item of this.items.values()) {
            const visible = tab_bar_toolbar_types_1.TabBarToolbarItem.is(item)
                ? this.commandRegistry.isVisible(item.command, widget)
                : (!item.isVisible || item.isVisible(widget));
            if (visible && (!item.when || this.contextKeyService.match(item.when, widget.node))) {
                result.push(item);
            }
        }
        for (const delegate of this.menuDelegates.values()) {
            if (delegate.isVisible(widget)) {
                const menu = this.menuRegistry.getMenu(delegate.menuPath);
                const children = common_1.CompoundMenuNode.getFlatChildren(menu.children);
                for (const child of children) {
                    if (!child.when || this.contextKeyService.match(child.when, widget.node)) {
                        if (child.children) {
                            for (const grandchild of child.children) {
                                if (!grandchild.when || this.contextKeyService.match(grandchild.when, widget.node)) {
                                    if (common_1.CommandMenuNode.is(grandchild)) {
                                        result.push(new tab_bar_toolbar_menu_adapters_1.ToolbarMenuNodeWrapper(grandchild, child.id, delegate.menuPath));
                                    }
                                    else if (common_1.CompoundMenuNode.is(grandchild)) {
                                        let menuPath;
                                        if (menuPath = this.menuRegistry.getPath(grandchild)) {
                                            result.push(new tab_bar_toolbar_menu_adapters_1.ToolbarMenuNodeWrapper(grandchild, child.id, menuPath));
                                        }
                                    }
                                }
                            }
                        }
                        else if (child.command) {
                            result.push(new tab_bar_toolbar_menu_adapters_1.ToolbarMenuNodeWrapper(child, '', delegate.menuPath));
                        }
                    }
                }
            }
        }
        return result;
    }
    unregisterItem(itemOrId) {
        const id = typeof itemOrId === 'string' ? itemOrId : itemOrId.id;
        if (this.items.delete(id)) {
            this.fireOnDidChange();
        }
    }
    registerMenuDelegate(menuPath, when) {
        const id = menuPath.join(menuDelegateSeparator);
        if (!this.menuDelegates.has(id)) {
            const isVisible = !when
                ? yes
                : typeof when === 'function'
                    ? when
                    : widget => this.contextKeyService.match(when, widget === null || widget === void 0 ? void 0 : widget.node);
            this.menuDelegates.set(id, { menuPath, isVisible });
            this.fireOnDidChange();
            return { dispose: () => this.unregisterMenuDelegate(menuPath) };
        }
        console.warn('Unable to register menu delegate. Delegate has already been registered', menuPath);
        return common_1.Disposable.NULL;
    }
    unregisterMenuDelegate(menuPath) {
        if (this.menuDelegates.delete(menuPath.join(menuDelegateSeparator))) {
            this.fireOnDidChange();
        }
    }
};
__decorate([
    (0, inversify_1.inject)(common_1.CommandRegistry),
    __metadata("design:type", common_1.CommandRegistry)
], TabBarToolbarRegistry.prototype, "commandRegistry", void 0);
__decorate([
    (0, inversify_1.inject)(context_key_service_1.ContextKeyService),
    __metadata("design:type", Object)
], TabBarToolbarRegistry.prototype, "contextKeyService", void 0);
__decorate([
    (0, inversify_1.inject)(common_1.MenuModelRegistry),
    __metadata("design:type", common_1.MenuModelRegistry)
], TabBarToolbarRegistry.prototype, "menuRegistry", void 0);
__decorate([
    (0, inversify_1.inject)(common_1.ContributionProvider),
    (0, inversify_1.named)(exports.TabBarToolbarContribution),
    __metadata("design:type", Object)
], TabBarToolbarRegistry.prototype, "contributionProvider", void 0);
TabBarToolbarRegistry = __decorate([
    (0, inversify_1.injectable)()
], TabBarToolbarRegistry);
exports.TabBarToolbarRegistry = TabBarToolbarRegistry;
//# sourceMappingURL=tab-bar-toolbar-registry.js.map