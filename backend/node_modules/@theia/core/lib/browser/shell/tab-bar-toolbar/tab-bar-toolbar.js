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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TabBarToolbar_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabBarToolbar = exports.TabBarToolbarFactory = void 0;
const inversify_1 = require("inversify");
const React = require("react");
const context_key_service_1 = require("../../context-key-service");
const common_1 = require("../../../common");
const context_menu_renderer_1 = require("../../context-menu-renderer");
const label_parser_1 = require("../../label-parser");
const widgets_1 = require("../../widgets");
const tab_bar_toolbar_registry_1 = require("./tab-bar-toolbar-registry");
const tab_bar_toolbar_types_1 = require("./tab-bar-toolbar-types");
/**
 * Factory for instantiating tab-bar toolbars.
 */
exports.TabBarToolbarFactory = Symbol('TabBarToolbarFactory');
/**
 * Tab-bar toolbar widget representing the active [tab-bar toolbar items](TabBarToolbarItem).
 */
let TabBarToolbar = TabBarToolbar_1 = class TabBarToolbar extends widgets_1.ReactWidget {
    constructor() {
        super();
        this.inline = new Map();
        this.more = new Map();
        this.toDisposeOnUpdateItems = new common_1.DisposableCollection();
        this.toDisposeOnSetCurrent = new common_1.DisposableCollection();
        this.showMoreContextMenu = (event) => {
            event.stopPropagation();
            event.preventDefault();
            const anchor = this.toAnchor(event);
            this.renderMoreContextMenu(anchor);
        };
        this.executeCommand = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const item = this.inline.get(e.currentTarget.id);
            if (!item || !this.isEnabled(item)) {
                return;
            }
            if (item.command && item.menuPath) {
                this.menuCommandExecutor.executeCommand(item.menuPath, item.command, this.current);
            }
            else if (item.command) {
                this.commands.executeCommand(item.command, this.current);
            }
            else if (item.menuPath) {
                this.renderMoreContextMenu(this.toAnchor(e), item.menuPath);
            }
            this.update();
        };
        this.onMouseDownEvent = (e) => {
            if (e.button === 0) {
                e.currentTarget.classList.add('active');
            }
        };
        this.onMouseUpEvent = (e) => {
            e.currentTarget.classList.remove('active');
        };
        this.addClass(TabBarToolbar_1.Styles.TAB_BAR_TOOLBAR);
        this.hide();
    }
    updateItems(items, current) {
        var _a;
        this.toDisposeOnUpdateItems.dispose();
        this.toDisposeOnUpdateItems = new common_1.DisposableCollection();
        this.inline.clear();
        this.more.clear();
        const contextKeys = new Set();
        for (const item of items.sort(tab_bar_toolbar_types_1.TabBarToolbarItem.PRIORITY_COMPARATOR).reverse()) {
            if ('command' in item) {
                this.commands.getAllHandlers(item.command).forEach(handler => {
                    if (handler.onDidChangeEnabled) {
                        this.toDisposeOnUpdateItems.push(handler.onDidChangeEnabled(() => this.update()));
                    }
                });
            }
            if ('render' in item || item.group === undefined || item.group === 'navigation') {
                this.inline.set(item.id, item);
            }
            else {
                this.more.set(item.id, item);
            }
            if (item.when) {
                (_a = this.contextKeyService.parseKeys(item.when)) === null || _a === void 0 ? void 0 : _a.forEach(key => contextKeys.add(key));
            }
        }
        this.updateContextKeyListener(contextKeys);
        this.setCurrent(current);
        if (items.length) {
            this.show();
        }
        else {
            this.hide();
        }
        this.update();
    }
    updateTarget(current) {
        const operativeWidget = tab_bar_toolbar_types_1.TabBarDelegator.is(current) ? current.getTabBarDelegate() : current;
        const items = operativeWidget ? this.toolbarRegistry.visibleItems(operativeWidget) : [];
        this.updateItems(items, operativeWidget);
    }
    setCurrent(current) {
        this.toDisposeOnSetCurrent.dispose();
        this.toDispose.push(this.toDisposeOnSetCurrent);
        this.current = current;
        if (current) {
            const resetCurrent = () => {
                this.setCurrent(undefined);
                this.update();
            };
            current.disposed.connect(resetCurrent);
            this.toDisposeOnSetCurrent.push(common_1.Disposable.create(() => current.disposed.disconnect(resetCurrent)));
        }
    }
    updateContextKeyListener(contextKeys) {
        var _a;
        (_a = this.contextKeyListener) === null || _a === void 0 ? void 0 : _a.dispose();
        if (contextKeys.size > 0) {
            this.contextKeyListener = this.contextKeyService.onDidChange(event => {
                if (event.affects(contextKeys)) {
                    this.update();
                }
            });
        }
    }
    render() {
        return React.createElement(React.Fragment, null,
            this.renderMore(),
            [...this.inline.values()].map(item => tab_bar_toolbar_types_1.TabBarToolbarItem.is(item) ? this.renderItem(item) : item.render(this.current)));
    }
    renderItem(item) {
        let innerText = '';
        const classNames = [];
        if (item.text) {
            for (const labelPart of this.labelParser.parse(item.text)) {
                if (label_parser_1.LabelIcon.is(labelPart)) {
                    const className = `fa fa-${labelPart.name}${labelPart.animation ? ' fa-' + labelPart.animation : ''}`;
                    classNames.push(...className.split(' '));
                }
                else {
                    innerText = labelPart;
                }
            }
        }
        const command = item.command ? this.commands.getCommand(item.command) : undefined;
        let iconClass = (typeof item.icon === 'function' && item.icon()) || item.icon || (command && command.iconClass);
        if (iconClass) {
            iconClass += ` ${widgets_1.ACTION_ITEM}`;
            classNames.push(iconClass);
        }
        const tooltip = item.tooltip || (command && command.label);
        const toolbarItemClassNames = this.getToolbarItemClassNames(item);
        return React.createElement("div", { key: item.id, className: toolbarItemClassNames.join(' '), onMouseDown: this.onMouseDownEvent, onMouseUp: this.onMouseUpEvent, onMouseOut: this.onMouseUpEvent },
            React.createElement("div", { id: item.id, className: classNames.join(' '), onClick: this.executeCommand, title: tooltip }, innerText));
    }
    isEnabled(item) {
        if (!!item.command) {
            return this.commandIsEnabled(item.command) && this.evaluateWhenClause(item.when);
        }
        else {
            return !!item.menuPath;
        }
    }
    getToolbarItemClassNames(item) {
        const classNames = [TabBarToolbar_1.Styles.TAB_BAR_TOOLBAR_ITEM];
        if (item.command) {
            if (this.isEnabled(item)) {
                classNames.push('enabled');
            }
            if (this.commandIsToggled(item.command)) {
                classNames.push('toggled');
            }
        }
        return classNames;
    }
    renderMore() {
        return !!this.more.size && React.createElement("div", { key: '__more__', className: TabBarToolbar_1.Styles.TAB_BAR_TOOLBAR_ITEM + ' enabled' },
            React.createElement("div", { id: '__more__', className: (0, widgets_1.codicon)('ellipsis', true), onClick: this.showMoreContextMenu, title: common_1.nls.localizeByDefault('More Actions...') }));
    }
    toAnchor(event) {
        var _a;
        const itemBox = (_a = event.currentTarget.closest('.' + TabBarToolbar_1.Styles.TAB_BAR_TOOLBAR_ITEM)) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        return itemBox ? { y: itemBox.bottom, x: itemBox.left } : event.nativeEvent;
    }
    renderMoreContextMenu(anchor, subpath) {
        var _a, _b;
        const toDisposeOnHide = new common_1.DisposableCollection();
        this.addClass('menu-open');
        toDisposeOnHide.push(common_1.Disposable.create(() => this.removeClass('menu-open')));
        if (subpath) {
            toDisposeOnHide.push(this.menus.linkSubmenu(tab_bar_toolbar_types_1.TAB_BAR_TOOLBAR_CONTEXT_MENU, subpath));
        }
        else {
            for (const item of this.more.values()) {
                if (item.menuPath && !item.command) {
                    toDisposeOnHide.push(this.menus.linkSubmenu(tab_bar_toolbar_types_1.TAB_BAR_TOOLBAR_CONTEXT_MENU, item.menuPath, undefined, item.group));
                }
                else if (item.command) {
                    // Register a submenu for the item, if the group is in format `<submenu group>/<submenu name>/.../<item group>`
                    if ((_a = item.group) === null || _a === void 0 ? void 0 : _a.includes('/')) {
                        const split = item.group.split('/');
                        const paths = [];
                        for (let i = 0; i < split.length - 1; i += 2) {
                            paths.push(split[i], split[i + 1]);
                            toDisposeOnHide.push(this.menus.registerSubmenu([...tab_bar_toolbar_types_1.TAB_BAR_TOOLBAR_CONTEXT_MENU, ...paths], split[i + 1], { order: item.order }));
                        }
                    }
                    toDisposeOnHide.push(this.menus.registerMenuAction([...tab_bar_toolbar_types_1.TAB_BAR_TOOLBAR_CONTEXT_MENU, ...item.group.split('/')], {
                        label: item.tooltip,
                        commandId: item.command,
                        when: item.when,
                        order: item.order,
                    }));
                }
            }
        }
        return this.contextMenuRenderer.render({
            menuPath: tab_bar_toolbar_types_1.TAB_BAR_TOOLBAR_CONTEXT_MENU,
            args: [this.current],
            anchor,
            context: (_b = this.current) === null || _b === void 0 ? void 0 : _b.node,
            onHide: () => toDisposeOnHide.dispose()
        });
    }
    shouldHandleMouseEvent(event) {
        return event.target instanceof Element && this.node.contains(event.target);
    }
    commandIsEnabled(command) {
        return this.commands.isEnabled(command, this.current);
    }
    commandIsToggled(command) {
        return this.commands.isToggled(command, this.current);
    }
    evaluateWhenClause(whenClause) {
        var _a;
        return whenClause ? this.contextKeyService.match(whenClause, (_a = this.current) === null || _a === void 0 ? void 0 : _a.node) : true;
    }
};
__decorate([
    (0, inversify_1.inject)(common_1.CommandRegistry),
    __metadata("design:type", common_1.CommandRegistry)
], TabBarToolbar.prototype, "commands", void 0);
__decorate([
    (0, inversify_1.inject)(label_parser_1.LabelParser),
    __metadata("design:type", label_parser_1.LabelParser)
], TabBarToolbar.prototype, "labelParser", void 0);
__decorate([
    (0, inversify_1.inject)(common_1.MenuModelRegistry),
    __metadata("design:type", common_1.MenuModelRegistry)
], TabBarToolbar.prototype, "menus", void 0);
__decorate([
    (0, inversify_1.inject)(common_1.MenuCommandExecutor),
    __metadata("design:type", Object)
], TabBarToolbar.prototype, "menuCommandExecutor", void 0);
__decorate([
    (0, inversify_1.inject)(context_menu_renderer_1.ContextMenuRenderer),
    __metadata("design:type", context_menu_renderer_1.ContextMenuRenderer)
], TabBarToolbar.prototype, "contextMenuRenderer", void 0);
__decorate([
    (0, inversify_1.inject)(tab_bar_toolbar_registry_1.TabBarToolbarRegistry),
    __metadata("design:type", tab_bar_toolbar_registry_1.TabBarToolbarRegistry)
], TabBarToolbar.prototype, "toolbarRegistry", void 0);
__decorate([
    (0, inversify_1.inject)(context_key_service_1.ContextKeyService),
    __metadata("design:type", Object)
], TabBarToolbar.prototype, "contextKeyService", void 0);
TabBarToolbar = TabBarToolbar_1 = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], TabBarToolbar);
exports.TabBarToolbar = TabBarToolbar;
(function (TabBarToolbar) {
    let Styles;
    (function (Styles) {
        Styles.TAB_BAR_TOOLBAR = 'p-TabBar-toolbar';
        Styles.TAB_BAR_TOOLBAR_ITEM = 'item';
    })(Styles = TabBarToolbar.Styles || (TabBarToolbar.Styles = {}));
})(TabBarToolbar = exports.TabBarToolbar || (exports.TabBarToolbar = {}));
exports.TabBarToolbar = TabBarToolbar;
//# sourceMappingURL=tab-bar-toolbar.js.map