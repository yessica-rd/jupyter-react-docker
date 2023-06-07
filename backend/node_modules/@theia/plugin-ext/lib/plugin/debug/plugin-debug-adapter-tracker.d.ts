import * as theia from '@theia/plugin';
export declare class PluginDebugAdapterTracker implements theia.DebugAdapterTracker {
    protected readonly trackers: theia.DebugAdapterTracker[];
    constructor(trackers: theia.DebugAdapterTracker[]);
    static create(session: theia.DebugSession, trackerFactories: [string, theia.DebugAdapterTrackerFactory][]): Promise<PluginDebugAdapterTracker>;
    onWillStartSession(): void;
    onWillReceiveMessage(message: any): void;
    onDidSendMessage(message: any): void;
    onWillStopSession(): void;
    onError(error: Error): void;
    onExit(code: number | undefined, signal: string | undefined): void;
}
//# sourceMappingURL=plugin-debug-adapter-tracker.d.ts.map