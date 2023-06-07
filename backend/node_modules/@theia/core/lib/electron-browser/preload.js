"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preload = void 0;
// *****************************************************************************
// Copyright (C) 2023 STMicroelectronics and others.
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
//
const disposable_1 = require("../common/disposable");
const electron_api_1 = require("../electron-common/electron-api");
// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcRenderer, contextBridge } = require('electron');
// a map of menuId => map<handler id => handler>
const commandHandlers = new Map();
let nextHandlerId = 0;
const mainMenuId = 0;
let nextMenuId = mainMenuId + 1;
function convertMenu(menu, handlerMap) {
    if (!menu) {
        return undefined;
    }
    return menu.map(item => {
        let handlerId = undefined;
        if (item.execute) {
            handlerId = nextHandlerId++;
            handlerMap.set(handlerId, item.execute);
        }
        return {
            id: item.id,
            submenu: convertMenu(item.submenu, handlerMap),
            accelerator: item.accelerator,
            label: item.label,
            handlerId: handlerId,
            checked: item.checked,
            enabled: item.enabled,
            role: item.role,
            type: item.type,
            visible: item.visible
        };
    });
}
const api = {
    setMenuBarVisible: (visible, windowName) => ipcRenderer.send(electron_api_1.CHANNEL_SET_MENU_BAR_VISIBLE, visible, windowName),
    setMenu: (menu) => {
        commandHandlers.delete(mainMenuId);
        const handlers = new Map();
        commandHandlers.set(mainMenuId, handlers);
        ipcRenderer.send(electron_api_1.CHANNEL_SET_MENU, mainMenuId, convertMenu(menu, handlers));
    },
    getSecurityToken: () => ipcRenderer.invoke(electron_api_1.CHANNEL_GET_SECURITY_TOKEN),
    focusWindow: (name) => ipcRenderer.send(electron_api_1.CHANNEL_FOCUS_WINDOW, name),
    showItemInFolder: fsPath => {
        ipcRenderer.send(electron_api_1.CHANNEL_SHOW_ITEM_IN_FOLDER, fsPath);
    },
    attachSecurityToken: (endpoint) => ipcRenderer.invoke(electron_api_1.CHANNEL_ATTACH_SECURITY_TOKEN, endpoint),
    popup: async function (menu, x, y, onClosed) {
        const menuId = nextMenuId++;
        const handlers = new Map();
        commandHandlers.set(menuId, handlers);
        const handle = await ipcRenderer.invoke(electron_api_1.CHANNEL_OPEN_POPUP, menuId, convertMenu(menu, handlers), x, y);
        const closeListener = () => {
            ipcRenderer.removeListener(electron_api_1.CHANNEL_ON_CLOSE_POPUP, closeListener);
            commandHandlers.delete(menuId);
            onClosed();
        };
        ipcRenderer.on(electron_api_1.CHANNEL_ON_CLOSE_POPUP, closeListener);
        return handle;
    },
    closePopup: function (handle) {
        ipcRenderer.send(electron_api_1.CHANNEL_CLOSE_POPUP, handle);
    },
    getTitleBarStyleAtStartup: function () {
        return ipcRenderer.invoke(electron_api_1.CHANNEL_GET_TITLE_STYLE_AT_STARTUP);
    },
    setTitleBarStyle: function (style) {
        ipcRenderer.send(electron_api_1.CHANNEL_SET_TITLE_STYLE, style);
    },
    minimize: function () {
        ipcRenderer.send(electron_api_1.CHANNEL_MINIMIZE);
    },
    isMaximized: function () {
        return ipcRenderer.sendSync(electron_api_1.CHANNEL_IS_MAXIMIZED);
    },
    maximize: function () {
        ipcRenderer.send(electron_api_1.CHANNEL_MAXIMIZE);
    },
    unMaximize: function () {
        ipcRenderer.send(electron_api_1.CHANNEL_UNMAXIMIZE);
    },
    close: function () {
        ipcRenderer.send(electron_api_1.CHANNEL_CLOSE);
    },
    onWindowEvent: function (event, handler) {
        const h = (_event, evt) => {
            if (event === evt) {
                handler();
            }
        };
        ipcRenderer.on(electron_api_1.CHANNEL_ON_WINDOW_EVENT, h);
        return disposable_1.Disposable.create(() => ipcRenderer.off(electron_api_1.CHANNEL_ON_WINDOW_EVENT, h));
    },
    setCloseRequestHandler: function (handler) {
        ipcRenderer.on(electron_api_1.CHANNEL_REQUEST_CLOSE, async (event, stopReason, confirmChannel, cancelChannel) => {
            try {
                if (await handler(stopReason)) {
                    event.sender.send(confirmChannel);
                    return;
                }
                ;
            }
            catch (e) {
                console.warn('exception in close handler ', e);
            }
            event.sender.send(cancelChannel);
        });
    },
    toggleDevTools: function () {
        ipcRenderer.send(electron_api_1.CHANNEL_TOGGLE_DEVTOOLS);
    },
    getZoomLevel: function () {
        return ipcRenderer.invoke(electron_api_1.CHANNEL_GET_ZOOM_LEVEL);
    },
    setZoomLevel: function (desired) {
        ipcRenderer.send(electron_api_1.CHANNEL_SET_ZOOM_LEVEL, desired);
    },
    isFullScreenable: function () {
        return ipcRenderer.sendSync(electron_api_1.CHANNEL_IS_FULL_SCREENABLE);
    },
    isFullScreen: function () {
        return ipcRenderer.sendSync(electron_api_1.CHANNEL_IS_FULL_SCREEN);
    },
    toggleFullScreen: function () {
        ipcRenderer.send(electron_api_1.CHANNEL_TOGGLE_FULL_SCREEN);
    },
    requestReload: () => ipcRenderer.send(electron_api_1.CHANNEL_REQUEST_RELOAD),
    restart: () => ipcRenderer.send(electron_api_1.CHANNEL_RESTART),
    applicationStateChanged: state => {
        ipcRenderer.send(electron_api_1.CHANNEL_APP_STATE_CHANGED, state);
    },
    readClipboard() {
        return ipcRenderer.sendSync(electron_api_1.CHANNEL_READ_CLIPBOARD);
    },
    writeClipboard(text) {
        ipcRenderer.send(electron_api_1.CHANNEL_WRITE_CLIPBOARD, text);
    },
    onKeyboardLayoutChanged(handler) {
        return createDisposableListener(electron_api_1.CHANNEL_KEYBOARD_LAYOUT_CHANGED, (event, layout) => { handler(layout); });
    },
    onData: handler => createDisposableListener(electron_api_1.CHANNEL_IPC_CONNECTION, (event, data) => { handler(data); }),
    sendData: data => {
        ipcRenderer.send(electron_api_1.CHANNEL_IPC_CONNECTION, data);
    },
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createDisposableListener(channel, handler) {
    ipcRenderer.on(channel, handler);
    return disposable_1.Disposable.create(() => ipcRenderer.off(channel, handler));
}
function preload() {
    console.log('exposing theia core electron api');
    ipcRenderer.on(electron_api_1.CHANNEL_INVOKE_MENU, (_, menuId, handlerId) => {
        const map = commandHandlers.get(menuId);
        if (map) {
            const handler = map.get(handlerId);
            if (handler) {
                handler();
            }
        }
    });
    contextBridge.exposeInMainWorld('electronTheiaCore', api);
}
exports.preload = preload;
//# sourceMappingURL=preload.js.map