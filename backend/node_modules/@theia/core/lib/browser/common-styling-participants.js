"use strict";
// *****************************************************************************
// Copyright (C) 2022 TypeFox and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonStylingParticipant = exports.TabbarStylingParticipant = exports.BadgeStylingParticipant = exports.MenuStylingParticipant = exports.StatusBarStylingParticipant = exports.BreadcrumbStylingParticipant = exports.TreeStylingParticipant = exports.ActionLabelStylingParticipant = exports.bindCommonStylingParticipants = void 0;
const inversify_1 = require("inversify");
const styling_service_1 = require("./styling-service");
const theme_1 = require("../common/theme");
function bindCommonStylingParticipants(bind) {
    for (const participant of [
        ActionLabelStylingParticipant,
        BadgeStylingParticipant,
        BreadcrumbStylingParticipant,
        ButtonStylingParticipant,
        MenuStylingParticipant,
        TabbarStylingParticipant,
        TreeStylingParticipant,
        StatusBarStylingParticipant
    ]) {
        bind(participant).toSelf().inSingletonScope();
        bind(styling_service_1.StylingParticipant).toService(participant);
    }
}
exports.bindCommonStylingParticipants = bindCommonStylingParticipants;
let ActionLabelStylingParticipant = class ActionLabelStylingParticipant {
    registerThemeStyle(theme, collector) {
        const focusBorder = theme.getColor('focusBorder');
        if ((0, theme_1.isHighContrast)(theme.type) && focusBorder) {
            if (focusBorder) {
                collector.addRule(`
                    .action-label:hover {
                        outline: 1px dashed ${focusBorder};
                    }
                `);
            }
        }
    }
};
ActionLabelStylingParticipant = __decorate([
    (0, inversify_1.injectable)()
], ActionLabelStylingParticipant);
exports.ActionLabelStylingParticipant = ActionLabelStylingParticipant;
let TreeStylingParticipant = class TreeStylingParticipant {
    registerThemeStyle(theme, collector) {
        const focusBorder = theme.getColor('focusBorder');
        if ((0, theme_1.isHighContrast)(theme.type) && focusBorder) {
            collector.addRule(`
                .theia-TreeNode {
                    outline-offset: -1px;
                }
                .theia-TreeNode:hover {
                    outline: 1px dashed ${focusBorder};
                }
                .theia-Tree .theia-TreeNode.theia-mod-selected {
                    outline: 1px dotted ${focusBorder};
                }
                .theia-Tree:focus .theia-TreeNode.theia-mod-selected,
                .theia-Tree .ReactVirtualized__List:focus .theia-TreeNode.theia-mod-selected {
                    outline: 1px solid ${focusBorder};
                }
            `);
        }
    }
};
TreeStylingParticipant = __decorate([
    (0, inversify_1.injectable)()
], TreeStylingParticipant);
exports.TreeStylingParticipant = TreeStylingParticipant;
let BreadcrumbStylingParticipant = class BreadcrumbStylingParticipant {
    registerThemeStyle(theme, collector) {
        const contrastBorder = theme.getColor('contrastBorder');
        if ((0, theme_1.isHighContrast)(theme.type) && contrastBorder) {
            collector.addRule(`
                .theia-tabBar-breadcrumb-row {
                    outline: 1px solid ${contrastBorder};
                }
            `);
        }
    }
};
BreadcrumbStylingParticipant = __decorate([
    (0, inversify_1.injectable)()
], BreadcrumbStylingParticipant);
exports.BreadcrumbStylingParticipant = BreadcrumbStylingParticipant;
let StatusBarStylingParticipant = class StatusBarStylingParticipant {
    registerThemeStyle(theme, collector) {
        const focusBorder = theme.getColor('focusBorder');
        if ((0, theme_1.isHighContrast)(theme.type) && focusBorder) {
            collector.addRule(`
                #theia-statusBar .area .element.hasCommand:hover {
                    outline: 1px dashed ${focusBorder};
                }
                #theia-statusBar .area .element.hasCommand:active {
                    outline: 1px solid ${focusBorder};
                }
                .theia-mod-offline #theia-statusBar .area .element.hasCommand:hover {
                    outline: none;
                }
                .theia-mod-offline #theia-statusBar .area .element.hasCommand:active {
                    outline: none;
                }
            `);
        }
        else {
            collector.addRule(`
                #theia-statusBar .area .element.hasCommand:hover {
                    background-color: var(--theia-statusBarItem-hoverBackground);
                }
                #theia-statusBar .area .element.hasCommand:active {
                    background-color: var(--theia-statusBarItem-activeBackground);
                }
                .theia-mod-offline #theia-statusBar .area .element.hasCommand:hover {
                    background-color: var(--theia-statusBarItem-offlineHoverBackground) !important;
                }
                .theia-mod-offline #theia-statusBar .area .element.hasCommand:active {
                    background-color: var(--theia-statusBarItem-offlineActiveBackground) !important;
                }
            `);
        }
    }
};
StatusBarStylingParticipant = __decorate([
    (0, inversify_1.injectable)()
], StatusBarStylingParticipant);
exports.StatusBarStylingParticipant = StatusBarStylingParticipant;
let MenuStylingParticipant = class MenuStylingParticipant {
    registerThemeStyle(theme, collector) {
        const focusBorder = theme.getColor('focusBorder');
        if ((0, theme_1.isHighContrast)(theme.type) && focusBorder) {
            // Menu items
            collector.addRule(`
                .p-Menu .p-Menu-item.p-mod-active {
                    outline: 1px solid ${focusBorder};
                    outline-offset: -1px;
                }
                .p-MenuBar .p-MenuBar-item.p-mod-active {
                    outline: 1px dashed ${focusBorder};
                }
                .p-MenuBar.p-mod-active .p-MenuBar-item.p-mod-active {
                    outline: 1px solid ${focusBorder};
                }
            `);
            // Sidebar items
            collector.addRule(`
                .theia-sidebar-menu > :hover {
                    outline: 1px dashed ${focusBorder};
                    outline-offset: -7px;
                }
            `);
        }
    }
};
MenuStylingParticipant = __decorate([
    (0, inversify_1.injectable)()
], MenuStylingParticipant);
exports.MenuStylingParticipant = MenuStylingParticipant;
let BadgeStylingParticipant = class BadgeStylingParticipant {
    registerThemeStyle(theme, collector) {
        const contrastBorder = theme.getColor('contrastBorder');
        if ((0, theme_1.isHighContrast)(theme.type) && contrastBorder) {
            collector.addRule(`.p-TabBar .theia-badge-decorator-sidebar {
                outline: 1px solid ${contrastBorder};
            }`);
        }
    }
};
BadgeStylingParticipant = __decorate([
    (0, inversify_1.injectable)()
], BadgeStylingParticipant);
exports.BadgeStylingParticipant = BadgeStylingParticipant;
let TabbarStylingParticipant = class TabbarStylingParticipant {
    registerThemeStyle(theme, collector) {
        const focusBorder = theme.getColor('focusBorder');
        const contrastBorder = theme.getColor('contrastBorder');
        const highContrast = (0, theme_1.isHighContrast)(theme.type);
        if (highContrast && focusBorder) {
            collector.addRule(`
                #theia-main-content-panel .p-TabBar .p-TabBar-tab {
                    outline-offset: -4px;
                }
                #theia-main-content-panel .p-TabBar .p-TabBar-tab.p-mod-current {
                    outline: 1px solid ${focusBorder};
                }
                #theia-main-content-panel .p-TabBar .p-TabBar-tab:not(.p-mod-current):hover {
                    outline: 1px dashed ${focusBorder};
                }
            `);
        }
        const tabActiveBackground = theme.getColor('tab.activeBackground');
        const tabActiveBorderTop = theme.getColor('tab.activeBorderTop');
        const tabUnfocusedActiveBorderTop = theme.getColor('tab.unfocusedActiveBorderTop');
        const tabActiveBorder = theme.getColor('tab.activeBorder') || (highContrast && contrastBorder) || 'transparent';
        const tabUnfocusedActiveBorder = theme.getColor('tab.unfocusedActiveBorder') || (highContrast && contrastBorder) || 'transparent';
        collector.addRule(`
            #theia-main-content-panel .p-TabBar .p-TabBar-tab.p-mod-current {
                color: var(--theia-tab-activeForeground);
                ${tabActiveBackground ? `background: ${tabActiveBackground};` : ''}
                ${tabActiveBorderTop ? `border-top: 1px solid ${tabActiveBorderTop};` : ''}
                border-bottom: 1px solid ${tabActiveBorder};
            }
            #theia-main-content-panel .p-TabBar:not(.theia-tabBar-active) .p-TabBar-tab.p-mod-current {
                background: var(--theia-tab-unfocusedActiveBackground);
                color: var(--theia-tab-unfocusedActiveForeground);
                ${tabUnfocusedActiveBorderTop ? `border-top: 1px solid ${tabUnfocusedActiveBorderTop};` : ''}
                border-bottom: 1px solid ${tabUnfocusedActiveBorder};
            }
        `);
        // Highlight Modified Tabs
        const tabActiveModifiedBorder = theme.getColor('tab.activeModifiedBorder');
        const tabUnfocusedInactiveModifiedBorder = theme.getColor('tab.unfocusedInactiveModifiedBorder');
        const tabInactiveModifiedBorder = theme.getColor('tab.inactiveModifiedBorder');
        if (tabActiveModifiedBorder || tabInactiveModifiedBorder) {
            collector.addRule(`
                body.theia-editor-highlightModifiedTabs
                #theia-main-content-panel .p-TabBar .p-TabBar-tab.theia-mod-dirty {
                    border-top: 2px solid ${tabInactiveModifiedBorder};
                    padding-bottom: 1px;
                }

                body.theia-editor-highlightModifiedTabs
                #theia-main-content-panel .p-TabBar.theia-tabBar-active .p-TabBar-tab.theia-mod-dirty.p-mod-current {
                    border-top: 2px solid ${tabActiveModifiedBorder};
                }
                
                body.theia-editor-highlightModifiedTabs
                #theia-main-content-panel .p-TabBar:not(.theia-tabBar-active) .p-TabBar-tab.theia-mod-dirty:not(.p-mod-current) {
                    border-top: 2px solid ${tabUnfocusedInactiveModifiedBorder};
                }
            `);
        }
        // Hover Background
        const tabHoverBackground = theme.getColor('tab.hoverBackground');
        if (tabHoverBackground) {
            collector.addRule(`
                #theia-main-content-panel .p-TabBar .p-TabBar-tab:hover {
                    background-color: ${tabHoverBackground};
                }
            `);
        }
        const tabUnfocusedHoverBackground = theme.getColor('tab.unfocusedHoverBackground');
        if (tabUnfocusedHoverBackground) {
            collector.addRule(`
                #theia-main-content-panel .p-TabBar:not(.theia-tabBar-active) .p-TabBar-tab:hover {
                    background-color: ${tabUnfocusedHoverBackground};
                }
            `);
        }
        // Hover Foreground
        const tabHoverForeground = theme.getColor('tab.hoverForeground');
        if (tabHoverForeground) {
            collector.addRule(`
                #theia-main-content-panel .p-TabBar .p-TabBar-tab:hover {
                    color: ${tabHoverForeground};
                }
            `);
        }
        const tabUnfocusedHoverForeground = theme.getColor('tab.unfocusedHoverForeground');
        if (tabUnfocusedHoverForeground) {
            collector.addRule(`
                #theia-main-content-panel .p-TabBar:not(.theia-tabBar-active) .p-TabBar-tab:hover {
                    color: ${tabUnfocusedHoverForeground};
                }
            `);
        }
        // Hover Border
        const tabHoverBorder = theme.getColor('tab.hoverBorder');
        if (tabHoverBorder) {
            collector.addRule(`
                #theia-main-content-panel .p-TabBar .p-TabBar-tab:hover {
                    box-shadow: 0 1px 0 ${tabHoverBorder} inset;
                }
            `);
        }
        const tabUnfocusedHoverBorder = theme.getColor('tab.unfocusedHoverBorder');
        if (tabUnfocusedHoverBorder) {
            collector.addRule(`
                #theia-main-content-panel .p-TabBar:not(.theia-tabBar-active) .p-TabBar-tab:hover {
                    box-shadow: 0 1px 0 ${tabUnfocusedHoverBorder} inset;
                }
            `);
        }
    }
};
TabbarStylingParticipant = __decorate([
    (0, inversify_1.injectable)()
], TabbarStylingParticipant);
exports.TabbarStylingParticipant = TabbarStylingParticipant;
let ButtonStylingParticipant = class ButtonStylingParticipant {
    registerThemeStyle(theme, collector) {
        const contrastBorder = theme.getColor('contrastBorder');
        if ((0, theme_1.isHighContrast)(theme.type) && contrastBorder) {
            collector.addRule(`
                .theia-button {
                    border: 1px solid ${contrastBorder};
                }
            `);
        }
        const buttonBackground = theme.getColor('button.background');
        collector.addRule(`
            .theia-button {
                background: ${buttonBackground || 'none'};
            }
        `);
        const buttonHoverBackground = theme.getColor('button.hoverBackground');
        if (buttonHoverBackground) {
            collector.addRule(`
                .theia-button:hover {
                    background-color: ${buttonHoverBackground};
                }
            `);
        }
        const secondaryButtonBackground = theme.getColor('secondaryButton.background');
        collector.addRule(`
            .theia-button.secondary {
                background: ${secondaryButtonBackground || 'none'};
            }
        `);
        const secondaryButtonHoverBackground = theme.getColor('secondaryButton.hoverBackground');
        if (secondaryButtonHoverBackground) {
            collector.addRule(`
                .theia-button.secondary:hover {
                    background-color: ${secondaryButtonHoverBackground};
                }
            `);
        }
    }
};
ButtonStylingParticipant = __decorate([
    (0, inversify_1.injectable)()
], ButtonStylingParticipant);
exports.ButtonStylingParticipant = ButtonStylingParticipant;
//# sourceMappingURL=common-styling-participants.js.map