/// <reference types="lodash" />
import { interfaces } from '@theia/core/shared/inversify';
import { WebviewsMain } from '../../common/plugin-api-rpc';
import { RPCProtocol } from '../../common/rpc-protocol';
import { ViewBadge, WebviewOptions, WebviewPanelOptions, WebviewPanelShowOptions } from '@theia/plugin';
import { ApplicationShell } from '@theia/core/lib/browser/shell/application-shell';
import { WebviewWidget } from './webview/webview';
import { Disposable } from '@theia/core/lib/common/disposable';
import { ViewColumnService } from './view-column-service';
import { WidgetManager } from '@theia/core/lib/browser/widget-manager';
import { HostedPluginSupport } from '../../hosted/browser/hosted-plugin';
import { IconUrl } from '../../common/plugin-protocol';
export declare class WebviewsMainImpl implements WebviewsMain, Disposable {
    private readonly proxy;
    protected readonly shell: ApplicationShell;
    protected readonly widgetManager: WidgetManager;
    protected readonly pluginService: HostedPluginSupport;
    protected readonly viewColumnService: ViewColumnService;
    private readonly toDispose;
    constructor(rpc: RPCProtocol, container: interfaces.Container);
    dispose(): void;
    $createWebviewPanel(panelId: string, viewType: string, title: string, showOptions: WebviewPanelShowOptions, options: WebviewPanelOptions & WebviewOptions): Promise<void>;
    hookWebview(view: WebviewWidget): void;
    addOrReattachWidget(widget: WebviewWidget, showOptions: WebviewPanelShowOptions): void;
    $disposeWebview(handle: string): Promise<void>;
    $reveal(handle: string, showOptions: WebviewPanelShowOptions): Promise<void>;
    $setTitle(handle: string, value: string): Promise<void>;
    $setBadge(handle: string, badge: ViewBadge | undefined): Promise<void>;
    $setIconPath(handle: string, iconUrl: IconUrl | undefined): Promise<void>;
    $setHtml(handle: string, value: string): Promise<void>;
    $setOptions(handle: string, options: WebviewOptions): Promise<void>;
    $postMessage(handle: string, value: any): Promise<boolean>;
    $registerSerializer(viewType: string): void;
    $unregisterSerializer(viewType: string): void;
    protected restoreWidget(widget: WebviewWidget): Promise<void>;
    protected readonly updateViewStates: import("lodash").DebouncedFunc<() => void>;
    private updateViewState;
    private getWebview;
    private tryGetWebview;
}
//# sourceMappingURL=webviews-main.d.ts.map