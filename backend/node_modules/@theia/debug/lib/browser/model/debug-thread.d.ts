/// <reference types="react" />
import * as React from '@theia/core/shared/react';
import { CancellationTokenSource, Emitter, Event } from '@theia/core';
import { DebugProtocol } from '@vscode/debugprotocol/lib/debugProtocol';
import { TreeElement } from '@theia/core/lib/browser/source-tree';
import { DebugStackFrame } from './debug-stack-frame';
import { DebugSession } from '../debug-session';
export declare type StoppedDetails = DebugProtocol.StoppedEvent['body'] & {
    framesErrorMessage?: string;
    totalFrames?: number;
};
export declare class DebugThreadData {
    readonly raw: DebugProtocol.Thread;
    readonly stoppedDetails: StoppedDetails | undefined;
}
export interface DebugExceptionInfo {
    id?: string;
    description?: string;
    details?: DebugProtocol.ExceptionDetails;
}
export declare class DebugThread extends DebugThreadData implements TreeElement {
    readonly session: DebugSession;
    protected readonly onDidChangedEmitter: Emitter<void>;
    readonly onDidChanged: Event<void>;
    protected readonly onDidFocusStackFrameEmitter: Emitter<DebugStackFrame | undefined>;
    get onDidFocusStackFrame(): Event<DebugStackFrame | undefined>;
    constructor(session: DebugSession);
    get id(): string;
    protected _currentFrame: DebugStackFrame | undefined;
    get currentFrame(): DebugStackFrame | undefined;
    set currentFrame(frame: DebugStackFrame | undefined);
    get stopped(): boolean;
    update(data: Partial<DebugThreadData>): void;
    clear(): void;
    continue(): Promise<DebugProtocol.ContinueResponse>;
    stepOver(): Promise<DebugProtocol.NextResponse>;
    stepIn(): Promise<DebugProtocol.StepInResponse>;
    stepOut(): Promise<DebugProtocol.StepOutResponse>;
    pause(): Promise<DebugProtocol.PauseResponse>;
    getExceptionInfo(): Promise<DebugExceptionInfo | undefined>;
    get supportsTerminate(): boolean;
    terminate(): Promise<void>;
    protected readonly _frames: Map<number, DebugStackFrame>;
    get frames(): IterableIterator<DebugStackFrame>;
    get topFrame(): DebugStackFrame | undefined;
    get frameCount(): number;
    protected pendingFetch: Promise<DebugStackFrame[]>;
    protected _pendingFetchCount: number;
    protected pendingFetchCancel: CancellationTokenSource;
    fetchFrames(levels?: number): Promise<DebugStackFrame[]>;
    get pendingFrameCount(): number;
    protected doFetchFrames(startFrame: number, levels: number): Promise<DebugProtocol.StackFrame[]>;
    protected doUpdateFrames(frames: DebugProtocol.StackFrame[]): DebugStackFrame[];
    protected clearFrames(): void;
    protected updateCurrentFrame(): void;
    protected toArgs<T extends object>(arg?: T): {
        threadId: number;
    } & T;
    render(): React.ReactNode;
}
//# sourceMappingURL=debug-thread.d.ts.map