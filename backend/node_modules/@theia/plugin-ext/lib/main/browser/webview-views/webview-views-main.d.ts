import { interfaces } from '@theia/core/shared/inversify';
import { WebviewViewsMain, WebviewViewsExt } from '../../../common/plugin-api-rpc';
import { RPCProtocol } from '../../../common/rpc-protocol';
import { Disposable, DisposableCollection, ILogger } from '@theia/core';
import { WebviewView } from './webview-views';
import { WebviewsMainImpl } from '../webviews-main';
import { Widget, WidgetManager } from '@theia/core/lib/browser';
import { PluginViewRegistry } from '../view/plugin-view-registry';
import { ViewBadge } from '@theia/plugin';
export declare class WebviewViewsMainImpl implements WebviewViewsMain, Disposable {
    readonly webviewsMain: WebviewsMainImpl;
    protected readonly proxy: WebviewViewsExt;
    protected readonly toDispose: DisposableCollection;
    protected readonly webviewViews: Map<string, WebviewView>;
    protected readonly webviewViewProviders: Map<string, Disposable>;
    protected readonly widgetManager: WidgetManager;
    protected readonly pluginViewRegistry: PluginViewRegistry;
    protected readonly logger: ILogger;
    constructor(rpc: RPCProtocol, container: interfaces.Container, webviewsMain: WebviewsMainImpl);
    dispose(): void;
    $registerWebviewViewProvider(viewType: string, options: {
        retainContextWhenHidden?: boolean;
        serializeBuffersForPostMessage: boolean;
    }): Promise<void>;
    protected getWebview(handle: string): Widget | undefined;
    $unregisterWebviewViewProvider(viewType: string): void;
    $setWebviewViewTitle(handle: string, value: string | undefined): void;
    $setWebviewViewDescription(handle: string, value: string | undefined): void;
    $setBadge(handle: string, badge: ViewBadge | undefined): Promise<void>;
    $show(handle: string, preserveFocus: boolean): void;
    protected getWebviewView(handle: string): WebviewView;
}
//# sourceMappingURL=webview-views-main.d.ts.map