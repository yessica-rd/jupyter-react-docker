import { NotificationExt } from '../common/plugin-api-rpc';
import { CancellationToken, Progress, ProgressOptions } from '@theia/plugin';
import { RPCProtocol } from '../common/rpc-protocol';
import { ProgressLocation } from './types-impl';
export declare class NotificationExtImpl implements NotificationExt {
    private readonly proxy;
    private mapProgressIdToCancellationSource;
    constructor(rpc: RPCProtocol);
    withProgress<R>(options: ProgressOptions, task: (progress: Progress<{
        message?: string;
        increment?: number;
    }>, token: CancellationToken) => PromiseLike<R>): Promise<R>;
    $acceptProgressCanceled(id: string): void;
    protected mapLocation(location: ProgressLocation | {
        viewId: string;
    }): string | undefined;
}
//# sourceMappingURL=notification.d.ts.map