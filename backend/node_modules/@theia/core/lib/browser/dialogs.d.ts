import { Disposable, MaybePromise, CancellationTokenSource } from '../common';
import { BaseWidget, Message } from './widgets';
import { FrontendApplicationContribution } from './frontend-application';
export declare class DialogProps {
    readonly title: string;
    /**
     * Determines the maximum width of the dialog in pixels.
     * Default value is undefined, which would result in the css property 'max-width: none' being applied to the dialog.
     */
    maxWidth?: number;
    /**
     * Determine the word wrapping behavior for content in the dialog.
     * - `normal`: breaks words at allowed break points.
     * - `break-word`: breaks otherwise unbreakable words.
     * - `initial`: sets the property to it's default value.
     * - `inherit`: inherit this property from it's parent element.
     * Default value is undefined, which would result in the css property 'word-wrap' not being applied to the dialog.
     */
    wordWrap?: 'normal' | 'break-word' | 'initial' | 'inherit';
}
export declare type DialogMode = 'open' | 'preview';
export declare type DialogError = string | boolean | {
    message: string;
    result: boolean;
};
export declare namespace DialogError {
    function getResult(error: DialogError): boolean;
    function getMessage(error: DialogError): string;
}
export declare namespace Dialog {
    const YES: string;
    const NO: string;
    const OK: string;
    const CANCEL: string;
}
export declare class DialogOverlayService implements FrontendApplicationContribution {
    protected static INSTANCE: DialogOverlayService;
    static get(): DialogOverlayService;
    protected readonly dialogs: AbstractDialog<any>[];
    constructor();
    initialize(): void;
    protected get currentDialog(): AbstractDialog<any> | undefined;
    push(dialog: AbstractDialog<any>): Disposable;
    protected handleEscape(event: KeyboardEvent): boolean | void;
    protected handleEnter(event: KeyboardEvent): boolean | void;
}
export declare abstract class AbstractDialog<T> extends BaseWidget {
    protected readonly props: DialogProps;
    protected readonly titleNode: HTMLDivElement;
    protected readonly contentNode: HTMLDivElement;
    protected readonly closeCrossNode: HTMLElement;
    protected readonly controlPanel: HTMLDivElement;
    protected readonly errorMessageNode: HTMLDivElement;
    protected resolve: undefined | ((value: T | undefined) => void);
    protected reject: undefined | ((reason: any) => void);
    protected closeButton: HTMLButtonElement | undefined;
    protected acceptButton: HTMLButtonElement | undefined;
    protected activeElement: HTMLElement | undefined;
    constructor(props: DialogProps);
    protected appendCloseButton(text?: string): HTMLButtonElement;
    protected appendAcceptButton(text?: string): HTMLButtonElement;
    protected createButton(text: string): HTMLButtonElement;
    protected onAfterAttach(msg: Message): void;
    protected handleEscape(event: KeyboardEvent): boolean | void;
    protected handleEnter(event: KeyboardEvent): boolean | void;
    protected onActivateRequest(msg: Message): void;
    open(): Promise<T | undefined>;
    close(): void;
    protected onUpdateRequest(msg: Message): void;
    protected validateCancellationSource: CancellationTokenSource;
    protected validate(): Promise<void>;
    protected acceptCancellationSource: CancellationTokenSource;
    protected accept(): Promise<void>;
    abstract get value(): T;
    /**
     * Return a string of zero-length or true if valid.
     */
    protected isValid(value: T, mode: DialogMode): MaybePromise<DialogError>;
    protected setErrorMessage(error: DialogError): void;
    protected addAction<K extends keyof HTMLElementEventMap>(element: HTMLElement, callback: () => void, ...additionalEventTypes: K[]): void;
    protected addCloseAction<K extends keyof HTMLElementEventMap>(element: HTMLElement, ...additionalEventTypes: K[]): void;
    protected addAcceptAction<K extends keyof HTMLElementEventMap>(element: HTMLElement, ...additionalEventTypes: K[]): void;
}
export declare class ConfirmDialogProps extends DialogProps {
    readonly msg: string | HTMLElement;
    readonly cancel?: string;
    readonly ok?: string;
}
export declare class ConfirmDialog extends AbstractDialog<boolean> {
    protected readonly props: ConfirmDialogProps;
    protected confirmed: boolean;
    constructor(props: ConfirmDialogProps);
    protected onCloseRequest(msg: Message): void;
    get value(): boolean;
    protected createMessageNode(msg: string | HTMLElement): HTMLElement;
}
export declare function confirmExit(): Promise<boolean>;
export declare class ConfirmSaveDialogProps extends ConfirmDialogProps {
    readonly save: string;
    performSave: () => Promise<void>;
}
export declare class ConfirmSaveDialog extends ConfirmDialog {
    protected readonly props: ConfirmSaveDialogProps;
    protected saveButton: HTMLButtonElement | undefined;
    constructor(props: ConfirmSaveDialogProps);
    protected appendSaveButton(text?: string): HTMLButtonElement;
    protected onActivateRequest(msg: Message): void;
}
export declare function confirmExitWithOrWithoutSaving(captionsToSave: string[], performSave: () => Promise<void>): Promise<boolean>;
export declare class SingleTextInputDialogProps extends DialogProps {
    readonly confirmButtonLabel?: string;
    readonly initialValue?: string;
    readonly placeholder?: string;
    readonly initialSelectionRange?: {
        start: number;
        end: number;
        direction?: 'forward' | 'backward' | 'none';
    };
    readonly validate?: (input: string, mode: DialogMode) => MaybePromise<DialogError>;
}
export declare class SingleTextInputDialog extends AbstractDialog<string> {
    protected props: SingleTextInputDialogProps;
    protected readonly inputField: HTMLInputElement;
    constructor(props: SingleTextInputDialogProps);
    get value(): string;
    protected isValid(value: string, mode: DialogMode): MaybePromise<DialogError>;
    protected onAfterAttach(msg: Message): void;
    protected onActivateRequest(msg: Message): void;
    protected handleEnter(event: KeyboardEvent): boolean | void;
}
//# sourceMappingURL=dialogs.d.ts.map