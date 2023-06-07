import { DebugAdapterSessionImpl } from '@theia/debug/lib/common/debug-adapter-session';
import * as theia from '@theia/plugin';
import { DebugAdapter } from '@theia/debug/lib/common/debug-model';
import { DebugChannel } from '@theia/debug/lib/common/debug-service';
/**
 * Server debug adapter session.
 */
export declare class PluginDebugAdapterSession extends DebugAdapterSessionImpl implements theia.DebugSession {
    readonly debugAdapter: DebugAdapter;
    protected readonly tracker: theia.DebugAdapterTracker;
    protected readonly theiaSession: theia.DebugSession;
    constructor(debugAdapter: DebugAdapter, tracker: theia.DebugAdapterTracker, theiaSession: theia.DebugSession);
    get parentSession(): theia.DebugSession | undefined;
    get type(): string;
    get name(): string;
    get workspaceFolder(): theia.WorkspaceFolder | undefined;
    get configuration(): theia.DebugConfiguration;
    start(channel: DebugChannel): Promise<void>;
    stop(): Promise<void>;
    customRequest(command: string, args?: any): Promise<any>;
    getDebugProtocolBreakpoint(breakpoint: theia.Breakpoint): Promise<theia.DebugProtocolBreakpoint | undefined>;
    protected onDebugAdapterError(error: Error): void;
    protected send(message: string): void;
    protected write(message: string): void;
    protected onDebugAdapterExit(): void;
}
//# sourceMappingURL=plugin-debug-adapter-session.d.ts.map