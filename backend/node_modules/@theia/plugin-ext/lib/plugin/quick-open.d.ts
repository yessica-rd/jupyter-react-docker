import { QuickOpenExt, QuickOpenMain, TransferInputBox, Plugin } from '../common/plugin-api-rpc';
import * as theia from '@theia/plugin';
import { RPCProtocol } from '../common/rpc-protocol';
import { Event } from '@theia/core/lib/common/event';
import { DisposableCollection } from '@theia/core/lib/common/disposable';
import { ThemeIcon } from './types-impl';
import { URI } from '@theia/core/shared/vscode-uri';
import { QuickInputButtonHandle } from '@theia/core/lib/browser';
import Severity from '@theia/monaco-editor-core/esm/vs/base/common/severity';
/**
 * Checks if the given error is a promise in canceled state
 */
export declare function isPromiseCanceledError(error: any): boolean;
export declare function getIconUris(iconPath: theia.QuickInputButton['iconPath']): {
    dark: URI;
    light: URI;
} | {
    id: string;
};
export declare function getLightIconUri(iconPath: URI | {
    light: URI;
    dark: URI;
}): URI;
export declare function getDarkIconUri(iconPath: URI | {
    light: URI;
    dark: URI;
}): URI;
export declare function getIconPathOrClass(button: theia.QuickInputButton): {
    iconPath: {
        dark: URI;
        light?: URI | undefined;
    } | undefined;
    iconClass: string | undefined;
};
export declare class QuickOpenExtImpl implements QuickOpenExt {
    private proxy;
    private onDidSelectItem;
    private validateInputHandler?;
    private _sessions;
    private _instances;
    constructor(rpc: RPCProtocol);
    showQuickPick(itemsOrItemsPromise: Array<theia.QuickPickItem> | Promise<Array<theia.QuickPickItem>>, options: theia.QuickPickOptions & {
        canPickMany: true;
    }, token?: theia.CancellationToken): Promise<Array<theia.QuickPickItem> | undefined>;
    showQuickPick(itemsOrItemsPromise: string[] | Promise<string[]>, options?: theia.QuickPickOptions, token?: theia.CancellationToken): Promise<string | undefined>;
    showQuickPick(itemsOrItemsPromise: Array<theia.QuickPickItem> | Promise<Array<theia.QuickPickItem>>, options?: theia.QuickPickOptions, token?: theia.CancellationToken): Promise<theia.QuickPickItem | undefined>;
    $onItemSelected(handle: number): void;
    showInput(options?: theia.InputBoxOptions, token?: theia.CancellationToken): PromiseLike<string | undefined>;
    showInputBox(options: TransferInputBox): Promise<string | undefined>;
    $validateInput(input: string): Promise<string | {
        content: string;
        severity: Severity;
    } | null | undefined>;
    createQuickPick<T extends theia.QuickPickItem>(plugin: Plugin): theia.QuickPick<T>;
    createInputBox(plugin: Plugin): theia.InputBox;
    hide(): void;
    $acceptOnDidAccept(sessionId: number): Promise<void>;
    $acceptDidChangeValue(sessionId: number, changedValue: string): Promise<void>;
    $acceptOnDidHide(sessionId: number): Promise<void>;
    $acceptOnDidTriggerButton(sessionId: number, btn: QuickInputButtonHandle): Promise<void>;
    $onDidChangeActive(sessionId: number, handles: number[]): void;
    $onDidChangeSelection(sessionId: number, handles: number[]): void;
    $onDidTriggerItemButton(sessionId: number, itemHandle: number, buttonHandle: number): void;
}
export declare class QuickInputExt implements theia.QuickInput {
    readonly quickOpen: QuickOpenExtImpl;
    readonly quickOpenMain: QuickOpenMain;
    readonly plugin: Plugin;
    private _onDidDispose;
    private static _nextId;
    _id: number;
    private _busy;
    private _enabled;
    private _ignoreFocusOut;
    private _step;
    private _title;
    private _totalSteps;
    private _value;
    private _placeholder;
    private _buttons;
    private _handlesToButtons;
    protected expectingHide: boolean;
    protected visible: boolean;
    private _disposed;
    protected disposableCollection: DisposableCollection;
    private onDidAcceptEmitter;
    /**
     * it has to be named `_onDidChangeValueEmitter`, since Gitlens extension relies on it
     * https://github.com/eamodio/vscode-gitlens/blob/f22a9cd4199ac498c217643282a6a412e1fc01ae/src/commands/gitCommands.ts#L242-L243
     */
    private _onDidChangeValueEmitter;
    private onDidHideEmitter;
    private onDidTriggerButtonEmitter;
    private _updateTimeout;
    private _pendingUpdate;
    constructor(quickOpen: QuickOpenExtImpl, quickOpenMain: QuickOpenMain, plugin: Plugin, _onDidDispose: () => void);
    get title(): string | undefined;
    set title(title: string | undefined);
    get step(): number | undefined;
    set step(step: number | undefined);
    get totalSteps(): number | undefined;
    set totalSteps(totalSteps: number | undefined);
    get enabled(): boolean;
    set enabled(enabled: boolean);
    get busy(): boolean;
    set busy(busy: boolean);
    get ignoreFocusOut(): boolean;
    set ignoreFocusOut(ignoreFocusOut: boolean);
    get value(): string;
    set value(value: string);
    get placeholder(): string | undefined;
    set placeholder(placeholder: string | undefined);
    get buttons(): theia.QuickInputButton[];
    set buttons(buttons: theia.QuickInputButton[]);
    show(): void;
    dispose(): void;
    protected update(properties: Record<string, any>): void;
    private dispatchUpdate;
    hide(): void;
    protected convertURL(iconPath: URI | {
        light: string | URI;
        dark: string | URI;
    } | ThemeIcon): URI | {
        light: string | URI;
        dark: string | URI;
    } | ThemeIcon;
    _fireAccept(): void;
    _fireChangedValue(changedValue: string): void;
    _fireHide(): void;
    _fireButtonTrigger(btn: theia.QuickInputButton): void;
    get onDidHide(): Event<void>;
    get onDidAccept(): Event<void>;
    get onDidChangeValue(): Event<string>;
    get onDidTriggerButton(): Event<theia.QuickInputButton>;
}
/**
 * Base implementation of {@link InputBox} that uses {@link QuickOpenExt}.
 * Missing functionality is going to be implemented in the scope of https://github.com/eclipse-theia/theia/issues/5109
 */
export declare class InputBoxExt extends QuickInputExt implements theia.InputBox {
    readonly quickOpen: QuickOpenExtImpl;
    readonly quickOpenMain: QuickOpenMain;
    readonly plugin: Plugin;
    private _password;
    private _prompt;
    private _valueSelection;
    private _validationMessage;
    constructor(quickOpen: QuickOpenExtImpl, quickOpenMain: QuickOpenMain, plugin: Plugin, onDispose: () => void);
    get password(): boolean;
    set password(password: boolean);
    get prompt(): string | undefined;
    set prompt(prompt: string | undefined);
    get valueSelection(): readonly [number, number] | undefined;
    set valueSelection(valueSelection: readonly [number, number] | undefined);
    get validationMessage(): string | undefined;
    set validationMessage(validationMessage: string | undefined);
}
/**
 * Base implementation of {@link QuickPick} that uses {@link QuickOpenExt}.
 * Missing functionality is going to be implemented in the scope of https://github.com/eclipse-theia/theia/issues/5059
 */
export declare class QuickPickExt<T extends theia.QuickPickItem> extends QuickInputExt implements theia.QuickPick<T> {
    readonly quickOpen: QuickOpenExtImpl;
    readonly quickOpenMain: QuickOpenMain;
    readonly plugin: Plugin;
    private _items;
    private _handlesToItems;
    private _itemsToHandles;
    private _canSelectMany;
    private _matchOnDescription;
    private _matchOnDetail;
    private _sortByLabel;
    private _keepScrollPosition;
    private _activeItems;
    private _selectedItems;
    private readonly _onDidChangeActiveEmitter;
    private readonly _onDidChangeSelectionEmitter;
    private readonly _onDidTriggerItemButtonEmitter;
    constructor(quickOpen: QuickOpenExtImpl, quickOpenMain: QuickOpenMain, plugin: Plugin, onDispose: () => void);
    get items(): T[];
    set items(items: T[]);
    get canSelectMany(): boolean;
    set canSelectMany(canSelectMany: boolean);
    get matchOnDescription(): boolean;
    set matchOnDescription(matchOnDescription: boolean);
    get matchOnDetail(): boolean;
    set matchOnDetail(matchOnDetail: boolean);
    get sortByLabel(): boolean;
    set sortByLabel(sortByLabel: boolean);
    get keepScrollPosition(): boolean;
    set keepScrollPosition(keepScrollPosition: boolean);
    get activeItems(): T[];
    set activeItems(activeItems: T[]);
    onDidChangeActive: Event<T[]>;
    get selectedItems(): T[];
    set selectedItems(selectedItems: T[]);
    onDidChangeSelection: Event<T[]>;
    _fireDidChangeActive(handles: number[]): void;
    _fireDidChangeSelection(handles: number[]): void;
    onDidTriggerItemButton: Event<theia.QuickPickItemButtonEvent<T>>;
    _fireDidTriggerItemButton(itemHandle: number, buttonHandle: number): void;
}
//# sourceMappingURL=quick-open.d.ts.map