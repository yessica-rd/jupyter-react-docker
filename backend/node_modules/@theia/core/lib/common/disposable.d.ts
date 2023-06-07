import { Event, Emitter } from './event';
export interface Disposable {
    /**
     * Dispose this object.
     */
    dispose(): void;
}
export declare namespace Disposable {
    function is(arg: unknown): arg is Disposable;
    function create(func: () => void): Disposable;
    /** Always provides a reference to a new disposable. */
    const NULL: Disposable;
}
export declare class DisposableCollection implements Disposable {
    protected readonly disposables: Disposable[];
    protected readonly onDisposeEmitter: Emitter<void>;
    constructor(...toDispose: Disposable[]);
    /**
     * This event is fired only once
     * on first dispose of not empty collection.
     */
    get onDispose(): Event<void>;
    protected checkDisposed(): void;
    get disposed(): boolean;
    private disposingElements;
    dispose(): void;
    push(disposable: Disposable): Disposable;
    pushAll(disposables: Disposable[]): Disposable[];
}
export declare type DisposableGroup = {
    push(disposable: Disposable): void;
} | {
    add(disposable: Disposable): void;
};
export declare namespace DisposableGroup {
    function canPush(candidate?: DisposableGroup): candidate is {
        push(disposable: Disposable): void;
    };
    function canAdd(candidate?: DisposableGroup): candidate is {
        add(disposable: Disposable): void;
    };
}
export declare function disposableTimeout(...args: Parameters<typeof setTimeout>): Disposable;
//# sourceMappingURL=disposable.d.ts.map