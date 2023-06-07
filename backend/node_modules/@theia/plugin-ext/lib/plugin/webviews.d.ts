import { Plugin, WebviewsExt, WebviewPanelViewState, WebviewsMain, WebviewInitData } from '../common/plugin-api-rpc';
import * as theia from '@theia/plugin';
import { RPCProtocol } from '../common/rpc-protocol';
import { Emitter, Event } from '@theia/core/lib/common/event';
import { WebviewPanelTargetArea } from './types-impl';
import { WorkspaceExtImpl } from './workspace';
export declare class WebviewsExtImpl implements WebviewsExt {
    private readonly workspace;
    private readonly proxy;
    private readonly webviewPanels;
    private readonly webviews;
    private readonly serializers;
    private initData;
    readonly onDidDisposeEmitter: Emitter<void>;
    readonly onDidDispose: Event<void>;
    constructor(rpc: RPCProtocol, workspace: WorkspaceExtImpl);
    init(initData: WebviewInitData): void;
    $onMessage(handle: string, message: any): void;
    $onDidChangeWebviewPanelViewState(handle: string, newState: WebviewPanelViewState): void;
    $onDidDisposeWebviewPanel(handle: string): PromiseLike<void>;
    $deserializeWebviewPanel(viewId: string, viewType: string, title: string, state: any, viewState: WebviewPanelViewState, options: theia.WebviewOptions & theia.WebviewPanelOptions): PromiseLike<void>;
    createWebview(viewType: string, title: string, showOptions: theia.ViewColumn | theia.WebviewPanelShowOptions, options: theia.WebviewPanelOptions & theia.WebviewOptions, plugin: Plugin): theia.WebviewPanel;
    createWebviewPanel(viewType: string, title: string, showOptions: theia.ViewColumn | theia.WebviewPanelShowOptions, options: theia.WebviewPanelOptions & theia.WebviewOptions, plugin: Plugin, viewId: string): WebviewPanelImpl;
    createNewWebview(options: theia.WebviewPanelOptions & theia.WebviewOptions, plugin: Plugin, viewId: string): WebviewImpl;
    registerWebviewPanelSerializer(viewType: string, serializer: theia.WebviewPanelSerializer, plugin: Plugin): theia.Disposable;
    getWebviewPanel(viewId: string): WebviewPanelImpl | undefined;
    deleteWebview(handle: string): void;
    getWebview(handle: string): WebviewImpl | undefined;
}
export declare class WebviewImpl implements theia.Webview {
    private readonly viewId;
    private readonly proxy;
    private readonly initData;
    private readonly workspace;
    readonly plugin: Plugin;
    private isDisposed;
    private _html;
    private _options;
    readonly onMessageEmitter: Emitter<any>;
    readonly onDidReceiveMessage: Event<any>;
    constructor(viewId: string, proxy: WebviewsMain, options: theia.WebviewOptions, initData: WebviewInitData, workspace: WorkspaceExtImpl, plugin: Plugin);
    dispose(): void;
    asWebviewUri(resource: theia.Uri): theia.Uri;
    get cspSource(): string;
    get html(): string;
    set html(value: string);
    get options(): theia.WebviewOptions;
    set options(newOptions: theia.WebviewOptions);
    postMessage(message: any): PromiseLike<boolean>;
    private checkIsDisposed;
    static toWebviewOptions(options: theia.WebviewOptions, workspace: WorkspaceExtImpl, plugin: Plugin): theia.WebviewOptions;
}
export declare class WebviewPanelImpl implements theia.WebviewPanel {
    private readonly viewId;
    private readonly proxy;
    private readonly _viewType;
    private _title;
    private readonly _options;
    private readonly _webview;
    private isDisposed;
    private _active;
    private _visible;
    private _showOptions;
    private _iconPath;
    readonly onDisposeEmitter: Emitter<void>;
    readonly onDidDispose: Event<void>;
    readonly onDidChangeViewStateEmitter: Emitter<theia.WebviewPanelOnDidChangeViewStateEvent>;
    readonly onDidChangeViewState: Event<theia.WebviewPanelOnDidChangeViewStateEvent>;
    constructor(viewId: string, proxy: WebviewsMain, _viewType: string, _title: string, showOptions: theia.ViewColumn | theia.WebviewPanelShowOptions, _options: theia.WebviewPanelOptions, _webview: WebviewImpl);
    dispose(): void;
    get viewType(): string;
    get title(): string;
    set title(newTitle: string);
    get iconPath(): theia.Uri | {
        light: theia.Uri;
        dark: theia.Uri;
    } | undefined;
    set iconPath(iconPath: theia.Uri | {
        light: theia.Uri;
        dark: theia.Uri;
    } | undefined);
    get webview(): WebviewImpl;
    get options(): theia.WebviewPanelOptions;
    get viewColumn(): theia.ViewColumn | undefined;
    setViewColumn(value: theia.ViewColumn | undefined): void;
    get showOptions(): theia.WebviewPanelShowOptions;
    setShowOptions(value: theia.WebviewPanelShowOptions): void;
    get active(): boolean;
    setActive(value: boolean): void;
    get visible(): boolean;
    setVisible(value: boolean): void;
    reveal(arg0?: theia.ViewColumn | WebviewPanelTargetArea, arg1?: theia.ViewColumn | boolean, arg2?: boolean): void;
    postMessage(message: any): PromiseLike<boolean>;
    private checkIsDisposed;
}
//# sourceMappingURL=webviews.d.ts.map