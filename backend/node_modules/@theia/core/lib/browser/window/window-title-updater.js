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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowTitleUpdater = void 0;
const navigatable_types_1 = require("../navigatable-types");
const inversify_1 = require("inversify");
const window_title_service_1 = require("./window-title-service");
const label_provider_1 = require("../label-provider");
const saveable_1 = require("../saveable");
const common_1 = require("../../common");
let WindowTitleUpdater = class WindowTitleUpdater {
    constructor() {
        this.toDisposeOnWidgetChanged = common_1.Disposable.NULL;
    }
    onStart(app) {
        app.shell.mainPanel.onDidChangeCurrent(title => this.handleWidgetChange(title === null || title === void 0 ? void 0 : title.owner));
        this.handleWidgetChange(app.shell.getCurrentWidget('main'));
    }
    handleWidgetChange(widget) {
        this.toDisposeOnWidgetChanged.dispose();
        const saveable = saveable_1.Saveable.get(widget);
        if (saveable) {
            this.toDisposeOnWidgetChanged = saveable.onDirtyChanged(() => this.windowTitleService.update({ dirty: saveable.dirty ? '●' : '' }));
        }
        else {
            this.toDisposeOnWidgetChanged = common_1.Disposable.NULL;
        }
        this.updateTitleWidget(widget);
    }
    /**
     * Updates the title of the application based on the currently opened widget.
     *
     * @param widget The current widget in the `main` application area. `undefined` if no widget is currently open in that area.
     */
    updateTitleWidget(widget) {
        let activeEditorLong;
        let activeEditorMedium;
        let activeEditorShort;
        let activeFolderLong;
        let activeFolderMedium;
        let activeFolderShort;
        let dirty;
        const uri = navigatable_types_1.NavigatableWidget.getUri(widget);
        if (uri) {
            activeEditorLong = uri.path.fsPath();
            activeEditorMedium = this.labelProvider.getLongName(uri);
            activeEditorShort = this.labelProvider.getName(uri);
            const parent = uri.parent;
            activeFolderLong = parent.path.fsPath();
            activeFolderMedium = this.labelProvider.getLongName(parent);
            activeFolderShort = this.labelProvider.getName(parent);
        }
        else if (widget) {
            const widgetTitle = widget.title.label;
            activeEditorLong = widgetTitle;
            activeEditorMedium = widgetTitle;
            activeEditorShort = widgetTitle;
        }
        if (saveable_1.Saveable.isDirty(widget)) {
            dirty = '●';
        }
        this.windowTitleService.update({
            activeEditorLong,
            activeEditorMedium,
            activeEditorShort,
            activeFolderLong,
            activeFolderMedium,
            activeFolderShort,
            dirty
        });
    }
};
__decorate([
    (0, inversify_1.inject)(window_title_service_1.WindowTitleService),
    __metadata("design:type", window_title_service_1.WindowTitleService)
], WindowTitleUpdater.prototype, "windowTitleService", void 0);
__decorate([
    (0, inversify_1.inject)(label_provider_1.LabelProvider),
    __metadata("design:type", label_provider_1.LabelProvider)
], WindowTitleUpdater.prototype, "labelProvider", void 0);
WindowTitleUpdater = __decorate([
    (0, inversify_1.injectable)()
], WindowTitleUpdater);
exports.WindowTitleUpdater = WindowTitleUpdater;
//# sourceMappingURL=window-title-updater.js.map