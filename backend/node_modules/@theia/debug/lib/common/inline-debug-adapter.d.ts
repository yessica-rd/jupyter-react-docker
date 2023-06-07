import { Event } from '@theia/core/lib/common/event';
import { DebugAdapter } from './debug-model';
import * as theia from '@theia/plugin';
/**
 * A debug adapter for using the inline implementation from a plugin.
 */
export declare class InlineDebugAdapter implements DebugAdapter {
    private debugAdapter;
    private messageReceivedEmitter;
    onMessageReceived: Event<string>;
    onError: Event<Error>;
    private closeEmitter;
    onClose: Event<void>;
    constructor(debugAdapter: theia.DebugAdapter);
    start(): Promise<void>;
    send(message: string): void;
    stop(): Promise<void>;
}
//# sourceMappingURL=inline-debug-adapter.d.ts.map