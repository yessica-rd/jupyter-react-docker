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
exports.MenuModelRegistry = exports.MenuContribution = void 0;
const inversify_1 = require("inversify");
const disposable_1 = require("../disposable");
const command_1 = require("../command");
const contribution_provider_1 = require("../contribution-provider");
const composite_menu_node_1 = require("./composite-menu-node");
const menu_types_1 = require("./menu-types");
const action_menu_node_1 = require("./action-menu-node");
exports.MenuContribution = Symbol('MenuContribution');
/**
 * The MenuModelRegistry allows to register and unregister menus, submenus and actions
 * via strings and {@link MenuAction}s without the need to access the underlying UI
 * representation.
 */
let MenuModelRegistry = class MenuModelRegistry {
    constructor(contributions, commands) {
        this.contributions = contributions;
        this.commands = commands;
        this.root = new composite_menu_node_1.CompositeMenuNode('');
        this.independentSubmenus = new Map();
    }
    onStart() {
        for (const contrib of this.contributions.getContributions()) {
            contrib.registerMenus(this);
        }
    }
    /**
     * Adds the given menu action to the menu denoted by the given path.
     *
     * @returns a disposable which, when called, will remove the menu action again.
     */
    registerMenuAction(menuPath, item) {
        const menuNode = new action_menu_node_1.ActionMenuNode(item, this.commands);
        return this.registerMenuNode(menuPath, menuNode);
    }
    /**
     * Adds the given menu node to the menu denoted by the given path.
     *
     * @returns a disposable which, when called, will remove the menu node again.
     */
    registerMenuNode(menuPath, menuNode, group) {
        const parent = this.getMenuNode(menuPath, group);
        return parent.addNode(menuNode);
    }
    getMenuNode(menuPath, group) {
        if (typeof menuPath === 'string') {
            const target = this.independentSubmenus.get(menuPath);
            if (!target) {
                throw new Error(`Could not find submenu with id ${menuPath}`);
            }
            if (group) {
                return this.findSubMenu(target, group);
            }
            return target;
        }
        else {
            return this.findGroup(group ? menuPath.concat(group) : menuPath);
        }
    }
    /**
     * Register a new menu at the given path with the given label.
     * (If the menu already exists without a label, iconClass or order this method can be used to set them.)
     *
     * @param menuPath the path for which a new submenu shall be registered.
     * @param label the label to be used for the new submenu.
     * @param options optionally allows to set an icon class and specify the order of the new menu.
     *
     * @returns if the menu was successfully created a disposable will be returned which,
     * when called, will remove the menu again. If the menu already existed a no-op disposable
     * will be returned.
     *
     * Note that if the menu already existed and was registered with a different label an error
     * will be thrown.
     */
    registerSubmenu(menuPath, label, options) {
        if (menuPath.length === 0) {
            throw new Error('The sub menu path cannot be empty.');
        }
        const index = menuPath.length - 1;
        const menuId = menuPath[index];
        const groupPath = index === 0 ? [] : menuPath.slice(0, index);
        const parent = this.findGroup(groupPath, options);
        let groupNode = this.findSubMenu(parent, menuId, options);
        if (!groupNode) {
            groupNode = new composite_menu_node_1.CompositeMenuNode(menuId, label, options, parent);
            return parent.addNode(groupNode);
        }
        else {
            groupNode.updateOptions(Object.assign(Object.assign({}, options), { label }));
            return disposable_1.Disposable.NULL;
        }
    }
    registerIndependentSubmenu(id, label, options) {
        if (this.independentSubmenus.has(id)) {
            console.debug(`Independent submenu with path ${id} registered, but given ID already exists.`);
        }
        this.independentSubmenus.set(id, new composite_menu_node_1.CompositeMenuNode(id, label, options));
        return { dispose: () => this.independentSubmenus.delete(id) };
    }
    linkSubmenu(parentPath, childId, options, group) {
        const child = this.getMenuNode(childId);
        const parent = this.getMenuNode(parentPath, group);
        const wrapper = new composite_menu_node_1.CompositeMenuNodeWrapper(child, parent, options);
        return parent.addNode(wrapper);
    }
    unregisterMenuAction(itemOrCommandOrId, menuPath) {
        const id = menu_types_1.MenuAction.is(itemOrCommandOrId) ? itemOrCommandOrId.commandId
            : command_1.Command.is(itemOrCommandOrId) ? itemOrCommandOrId.id
                : itemOrCommandOrId;
        if (menuPath) {
            const parent = this.findGroup(menuPath);
            parent.removeNode(id);
            return;
        }
        this.unregisterMenuNode(id);
    }
    /**
     * Recurse all menus, removing any menus matching the `id`.
     *
     * @param id technical identifier of the `MenuNode`.
     */
    unregisterMenuNode(id) {
        const recurse = (root) => {
            root.children.forEach(node => {
                if (menu_types_1.CompoundMenuNode.isMutable(node)) {
                    node.removeNode(id);
                    recurse(node);
                }
            });
        };
        recurse(this.root);
    }
    /**
     * Finds a submenu as a descendant of the `root` node.
     * See {@link MenuModelRegistry.findSubMenu findSubMenu}.
     */
    findGroup(menuPath, options) {
        let currentMenu = this.root;
        for (const segment of menuPath) {
            currentMenu = this.findSubMenu(currentMenu, segment, options);
        }
        return currentMenu;
    }
    /**
     * Finds or creates a submenu as an immediate child of `current`.
     * @throws if a node with the given `menuId` exists but is not a {@link MutableCompoundMenuNode}.
     */
    findSubMenu(current, menuId, options) {
        const sub = current.children.find(e => e.id === menuId);
        if (menu_types_1.CompoundMenuNode.isMutable(sub)) {
            return sub;
        }
        if (sub) {
            throw new Error(`'${menuId}' is not a menu group.`);
        }
        const newSub = new composite_menu_node_1.CompositeMenuNode(menuId, undefined, options, current);
        current.addNode(newSub);
        return newSub;
    }
    /**
     * Returns the menu at the given path.
     *
     * @param menuPath the path specifying the menu to return. If not given the empty path will be used.
     *
     * @returns the root menu when `menuPath` is empty. If `menuPath` is not empty the specified menu is
     * returned if it exists, otherwise an error is thrown.
     */
    getMenu(menuPath = []) {
        return this.findGroup(menuPath);
    }
    /**
     * Returns the {@link MenuPath path} at which a given menu node can be accessed from this registry, if it can be determined.
     * Returns `undefined` if the `parent` of any node in the chain is unknown.
     */
    getPath(node) {
        const identifiers = [];
        const visited = [];
        let next = node;
        while (next && !visited.includes(next)) {
            if (next === this.root) {
                return identifiers.reverse();
            }
            visited.push(next);
            identifiers.push(next.id);
            next = next.parent;
        }
        return undefined;
    }
};
MenuModelRegistry = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(contribution_provider_1.ContributionProvider)),
    __param(0, (0, inversify_1.named)(exports.MenuContribution)),
    __param(1, (0, inversify_1.inject)(command_1.CommandRegistry)),
    __metadata("design:paramtypes", [Object, command_1.CommandRegistry])
], MenuModelRegistry);
exports.MenuModelRegistry = MenuModelRegistry;
//# sourceMappingURL=menu-model-registry.js.map