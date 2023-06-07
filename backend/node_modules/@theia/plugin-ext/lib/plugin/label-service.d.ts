import { ResourceLabelFormatter } from '@theia/plugin';
import { Disposable } from '@theia/core/lib/common/disposable';
import { LabelServiceExt } from '../common/plugin-api-rpc';
import { RPCProtocol } from '../common/rpc-protocol';
export declare class LabelServiceExtImpl implements LabelServiceExt {
    readonly rpc: RPCProtocol;
    private handle;
    private proxy;
    constructor(rpc: RPCProtocol);
    $registerResourceLabelFormatter(formatter: ResourceLabelFormatter): Disposable;
}
//# sourceMappingURL=label-service.d.ts.map