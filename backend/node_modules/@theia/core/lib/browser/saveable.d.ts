import { Widget } from '@phosphor/widgets';
import { Message } from '@phosphor/messaging';
import { Event } from '../common/event';
import { MaybePromise } from '../common/types';
import { AbstractDialog } from './dialogs';
export interface Saveable {
    readonly dirty: boolean;
    readonly onDirtyChanged: Event<void>;
    readonly autoSave: 'off' | 'afterDelay' | 'onFocusChange' | 'onWindowChange';
    /**
     * Saves dirty changes.
     */
    save(options?: SaveOptions): MaybePromise<void>;
    /**
     * Reverts dirty changes.
     */
    revert?(options?: Saveable.RevertOptions): Promise<void>;
    /**
     * Creates a snapshot of the dirty state.
     */
    createSnapshot?(): Saveable.Snapshot;
    /**
     * Applies the given snapshot to the dirty state.
     */
    applySnapshot?(snapshot: object): void;
}
export interface SaveableSource {
    readonly saveable: Saveable;
}
export declare namespace Saveable {
    interface RevertOptions {
        /**
         * If soft then only dirty flag should be updated, otherwise
         * the underlying data should be reverted as well.
         */
        soft?: boolean;
    }
    type Snapshot = {
        value: string;
    } | {
        read(): string | null;
    };
    function isSource(arg: unknown): arg is SaveableSource;
    function is(arg: unknown): arg is Saveable;
    function get(arg: unknown): Saveable | undefined;
    function getDirty(arg: unknown): Saveable | undefined;
    function isDirty(arg: unknown): boolean;
    function save(arg: unknown, options?: SaveOptions): Promise<void>;
    function confirmSaveBeforeClose(toClose: Iterable<Widget>, others: Widget[]): Promise<boolean | undefined>;
    function apply(widget: Widget, getOtherSaveables?: () => Array<Widget | SaveableWidget>, doSave?: (widget: Widget, options?: SaveOptions) => Promise<void>): SaveableWidget | undefined;
    function shouldSave(saveable: Saveable, cb: () => MaybePromise<boolean | undefined>): Promise<boolean | undefined>;
}
export interface SaveableWidget extends Widget {
    /**
     * @param doRevert whether the saveable should be reverted before being saved. Defaults to `true`.
     */
    closeWithoutSaving(doRevert?: boolean): Promise<void>;
    closeWithSaving(options?: SaveableWidget.CloseOptions): Promise<void>;
}
export declare const close: unique symbol;
/**
 * An interface describing saveable widgets that are created by the `Saveable.apply` function.
 * The original `close` function is reassigned to a locally-defined `Symbol`
 */
export interface PostCreationSaveableWidget extends SaveableWidget {
    /**
     * The original `close` function of the widget
     */
    [close](): void;
}
export declare namespace SaveableWidget {
    function is(widget: Widget | undefined): widget is SaveableWidget;
    function getDirty<T extends Widget>(widgets: Iterable<T>): IterableIterator<SaveableWidget & T>;
    function get<T extends Widget>(widgets: Iterable<T>, filter?: (widget: T) => boolean): IterableIterator<SaveableWidget & T>;
    interface CloseOptions {
        shouldSave?(): MaybePromise<boolean | undefined>;
    }
}
/**
 * Possible formatting types when saving.
 */
export declare const enum FormatType {
    /**
     * Formatting should occur (default).
     */
    ON = 1,
    /**
     * Formatting should not occur.
     */
    OFF = 2,
    /**
     * Formatting should only occur if the resource is dirty.
     */
    DIRTY = 3
}
export interface SaveOptions {
    /**
     * Formatting type to apply when saving.
     */
    readonly formatType?: FormatType;
}
export declare function setDirty(widget: Widget, dirty: boolean): void;
export declare class ShouldSaveDialog extends AbstractDialog<boolean> {
    protected shouldSave: boolean;
    protected readonly dontSaveButton: HTMLButtonElement;
    constructor(widget: Widget);
    protected appendDontSaveButton(): HTMLButtonElement;
    protected onAfterAttach(msg: Message): void;
    get value(): boolean;
}
//# sourceMappingURL=saveable.d.ts.map