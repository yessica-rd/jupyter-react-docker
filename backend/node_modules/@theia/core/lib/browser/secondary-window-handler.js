"use strict";
// *****************************************************************************
// Copyright (C) 2022 STMicroelectronics, Ericsson, ARM, EclipseSource and others.
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
exports.SecondaryWindowHandler = void 0;
const debounce = require("lodash.debounce");
const inversify_1 = require("inversify");
const widgets_1 = require("./widgets");
const message_service_1 = require("../common/message-service");
const event_1 = require("../common/event");
const secondary_window_service_1 = require("./window/secondary-window-service");
const keybinding_1 = require("./keybinding");
const color_application_contribution_1 = require("./color-application-contribution");
/** Widget to be contained directly in a secondary window. */
class SecondaryWindowRootWidget extends widgets_1.Widget {
    constructor() {
        super();
        this.layout = new widgets_1.BoxLayout();
    }
    addWidget(widget) {
        this.layout.addWidget(widget);
        widgets_1.BoxPanel.setStretch(widget, 1);
    }
}
/**
 * Offers functionality to move a widget out of the main window to a newly created window.
 * Widgets must explicitly implement the `ExtractableWidget` interface to support this.
 *
 * This handler manages the opened secondary windows and sets up messaging between them and the Theia main window.
 * In addition, it provides access to the extracted widgets and provides notifications when widgets are added to or removed from this handler.
 *
 * @experimental The functionality provided by this handler is experimental and has known issues in Electron apps.
 */
let SecondaryWindowHandler = class SecondaryWindowHandler {
    constructor() {
        /** List of currently open secondary windows. Window references should be removed once the window is closed. */
        this.secondaryWindows = [];
        /** List of widgets in secondary windows. */
        this._widgets = [];
        this.onDidAddWidgetEmitter = new event_1.Emitter();
        /** Subscribe to get notified when a widget is added to this handler, i.e. the widget was moved to an secondary window . */
        this.onDidAddWidget = this.onDidAddWidgetEmitter.event;
        this.onDidRemoveWidgetEmitter = new event_1.Emitter();
        /** Subscribe to get notified when a widget is removed from this handler, i.e. the widget's window was closed or the widget was disposed. */
        this.onDidRemoveWidget = this.onDidRemoveWidgetEmitter.event;
    }
    /** @returns List of widgets in secondary windows. */
    get widgets() {
        // Create new array in case the original changes while this is used.
        return [...this._widgets];
    }
    /**
     * Sets up message forwarding from the main window to secondary windows.
     * Does nothing if this service has already been initialized.
     *
     * @param shell The `ApplicationShell` that widgets will be moved out from.
     */
    init(shell) {
        if (this.applicationShell) {
            // Already initialized
            return;
        }
        this.applicationShell = shell;
        // Set up messaging with secondary windows
        window.addEventListener('message', (event) => {
            console.trace('Message on main window', event);
            if (event.data.fromSecondary) {
                console.trace('Message comes from secondary window');
                return;
            }
            if (event.data.fromMain) {
                console.trace('Message has mainWindow marker, therefore ignore it');
                return;
            }
            // Filter setImmediate messages. Do not forward because these come in with very high frequency.
            // They are not needed in secondary windows because these messages are just a work around
            // to make setImmediate work in the main window: https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate
            if (typeof event.data === 'string' && event.data.startsWith('setImmediate')) {
                return;
            }
            console.trace('Delegate main window message to secondary windows', event);
            this.secondaryWindows.forEach(secondaryWindow => {
                if (!secondaryWindow.window.closed) {
                    secondaryWindow.window.postMessage(Object.assign(Object.assign({}, event.data), { fromMain: true }), '*');
                }
            });
        });
    }
    /**
     *  Moves the given widget to a new window.
     *
     * @param widget the widget to extract
     */
    moveWidgetToSecondaryWindow(widget) {
        if (!this.applicationShell) {
            console.error('Widget cannot be extracted because the WidgetExtractionHandler has not been initialized.');
            return;
        }
        if (!widget.isExtractable) {
            console.error('Widget is not extractable.', widget.id);
            return;
        }
        const newWindow = this.secondaryWindowService.createSecondaryWindow(closed => {
            this.applicationShell.closeWidget(widget.id);
            const extIndex = this.secondaryWindows.indexOf(closed);
            if (extIndex > -1) {
                this.secondaryWindows.splice(extIndex, 1);
            }
        });
        if (!newWindow) {
            this.messageService.error('The widget could not be moved to a secondary window because the window creation failed. Please make sure to allow popups.');
            return;
        }
        this.secondaryWindows.push(newWindow);
        const mainWindowTitle = document.title;
        newWindow.onload = () => {
            this.keybindings.registerEventListeners(newWindow);
            // Use the widget's title as the window title
            // Even if the widget's label were malicious, this should be safe against XSS because the HTML standard defines this is inserted via a text node.
            // See https://html.spec.whatwg.org/multipage/dom.html#document.title
            newWindow.document.title = `${widget.title.label} — ${mainWindowTitle}`;
            const element = newWindow.document.getElementById('widget-host');
            if (!element) {
                console.error('Could not find dom element to attach to in secondary window');
                return;
            }
            const unregisterWithColorContribution = this.colorAppContribution.registerWindow(newWindow);
            widget.secondaryWindow = newWindow;
            const rootWidget = new SecondaryWindowRootWidget();
            rootWidget.addClass('secondary-widget-root');
            widgets_1.Widget.attach(rootWidget, element);
            rootWidget.addWidget(widget);
            widget.show();
            widget.update();
            this.addWidget(widget);
            // Close the window if the widget is disposed, e.g. by a command closing all widgets.
            widget.disposed.connect(() => {
                unregisterWithColorContribution.dispose();
                this.removeWidget(widget);
                if (!newWindow.closed) {
                    newWindow.close();
                }
            });
            // debounce to avoid rapid updates while resizing the secondary window
            const updateWidget = debounce(() => {
                rootWidget.update();
            }, 100);
            newWindow.addEventListener('resize', () => {
                updateWidget();
            });
            widget.activate();
        };
    }
    /**
     * If the given widget is tracked by this handler, activate it and focus its secondary window.
     *
     * @param widgetId The widget to activate specified by its id
     * @returns The activated `ExtractableWidget` or `undefined` if the given widget id is unknown to this handler.
     */
    activateWidget(widgetId) {
        const trackedWidget = this.revealWidget(widgetId);
        trackedWidget === null || trackedWidget === void 0 ? void 0 : trackedWidget.activate();
        return trackedWidget;
    }
    /**
     * If the given widget is tracked by this handler, reveal it by focussing its secondary window.
     *
     * @param widgetId The widget to reveal specified by its id
     * @returns The revealed `ExtractableWidget` or `undefined` if the given widget id is unknown to this handler.
     */
    revealWidget(widgetId) {
        const trackedWidget = this._widgets.find(w => w.id === widgetId);
        if (trackedWidget) {
            this.secondaryWindowService.focus(trackedWidget.secondaryWindow);
            return trackedWidget;
        }
        return undefined;
    }
    addWidget(widget) {
        if (!this._widgets.includes(widget)) {
            this._widgets.push(widget);
            this.onDidAddWidgetEmitter.fire(widget);
        }
    }
    removeWidget(widget) {
        const index = this._widgets.indexOf(widget);
        if (index > -1) {
            this._widgets.splice(index, 1);
            this.onDidRemoveWidgetEmitter.fire(widget);
        }
    }
};
__decorate([
    (0, inversify_1.inject)(keybinding_1.KeybindingRegistry),
    __metadata("design:type", keybinding_1.KeybindingRegistry)
], SecondaryWindowHandler.prototype, "keybindings", void 0);
__decorate([
    (0, inversify_1.inject)(color_application_contribution_1.ColorApplicationContribution),
    __metadata("design:type", color_application_contribution_1.ColorApplicationContribution)
], SecondaryWindowHandler.prototype, "colorAppContribution", void 0);
__decorate([
    (0, inversify_1.inject)(message_service_1.MessageService),
    __metadata("design:type", message_service_1.MessageService)
], SecondaryWindowHandler.prototype, "messageService", void 0);
__decorate([
    (0, inversify_1.inject)(secondary_window_service_1.SecondaryWindowService),
    __metadata("design:type", Object)
], SecondaryWindowHandler.prototype, "secondaryWindowService", void 0);
SecondaryWindowHandler = __decorate([
    (0, inversify_1.injectable)()
], SecondaryWindowHandler);
exports.SecondaryWindowHandler = SecondaryWindowHandler;
//# sourceMappingURL=secondary-window-handler.js.map