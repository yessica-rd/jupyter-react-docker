import { Disposable } from './types-impl';
import { RPCProtocol } from '../common/rpc-protocol';
import { WebviewViewsMain, WebviewViewsExt, Plugin } from '../common/plugin-api-rpc';
import { CancellationToken } from '@theia/core/lib/common/cancellation';
import { WebviewImpl, WebviewsExtImpl } from './webviews';
import { WebviewViewProvider } from '@theia/plugin';
import { Emitter, Event } from '@theia/core/lib/common/event';
import * as theia from '@theia/plugin';
export declare class WebviewViewsExtImpl implements WebviewViewsExt {
    private readonly webviewsExt;
    private readonly proxy;
    protected readonly viewProviders: Map<string, {
        readonly provider: WebviewViewProvider;
        readonly plugin: Plugin;
    }>;
    protected readonly webviewViews: Map<string, WebviewViewExtImpl>;
    constructor(rpc: RPCProtocol, webviewsExt: WebviewsExtImpl);
    registerWebviewViewProvider(viewType: string, provider: WebviewViewProvider, plugin: Plugin, webviewOptions?: {
        retainContextWhenHidden?: boolean;
    }): Disposable;
    $resolveWebviewView(handle: string, viewType: string, title: string | undefined, state: any, cancellation: CancellationToken): Promise<void>;
    $onDidChangeWebviewViewVisibility(handle: string, visible: boolean): Promise<void>;
    $disposeWebviewView(handle: string): Promise<void>;
    protected getWebviewView(handle: string): WebviewViewExtImpl;
}
export declare class WebviewViewExtImpl implements theia.WebviewView {
    readonly onDidChangeVisibilityEmitter: Emitter<void>;
    readonly onDidChangeVisibility: Event<void>;
    readonly onDidDisposeEmitter: Emitter<void>;
    readonly onDidDispose: Event<void>;
    readonly handle: string;
    readonly proxy: WebviewViewsMain;
    readonly _viewType: string;
    readonly _webview: WebviewImpl;
    _isDisposed: boolean;
    _isVisible: boolean;
    _title: string | undefined;
    _description: string | undefined;
    _badge: theia.ViewBadge | undefined;
    constructor(handle: string, proxy: WebviewViewsMain, viewType: string, title: string | undefined, webview: WebviewImpl, isVisible: boolean);
    onDispose: Event<void>;
    dispose(): void;
    get title(): string | undefined;
    set title(value: string | undefined);
    get description(): string | undefined;
    set description(value: string | undefined);
    get badge(): theia.ViewBadge | undefined;
    set badge(badge: theia.ViewBadge | undefined);
    get visible(): boolean;
    get webview(): WebviewImpl;
    get viewType(): string;
    setVisible(visible: boolean): void;
    show(preserveFocus?: boolean): void;
    protected assertNotDisposed(): void;
}
//# sourceMappingURL=webview-views.d.ts.map