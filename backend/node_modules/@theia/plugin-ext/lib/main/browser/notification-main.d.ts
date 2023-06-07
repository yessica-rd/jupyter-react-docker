import { NotificationMain } from '../../common';
import { ProgressMessage } from '@theia/core/lib/common';
import { interfaces } from '@theia/core/shared/inversify';
import { RPCProtocol } from '../../common/rpc-protocol';
import { Disposable, DisposableCollection } from '@theia/core/lib/common/disposable';
export declare class NotificationMainImpl implements NotificationMain, Disposable {
    private readonly progressService;
    private readonly progressMap;
    private readonly progress2Work;
    private readonly proxy;
    protected readonly toDispose: DisposableCollection;
    constructor(rpc: RPCProtocol, container: interfaces.Container);
    dispose(): void;
    $startProgress(options: NotificationMain.StartProgressOptions): Promise<string>;
    protected mapOptions(options: NotificationMain.StartProgressOptions): ProgressMessage;
    $stopProgress(id: string): void;
    $updateProgress(id: string, item: NotificationMain.ProgressReport): void;
}
//# sourceMappingURL=notification-main.d.ts.map