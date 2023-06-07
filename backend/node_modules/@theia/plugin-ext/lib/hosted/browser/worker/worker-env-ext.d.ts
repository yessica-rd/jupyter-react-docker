import { EnvExtImpl } from '../../../plugin/env';
import { RPCProtocol } from '../../../common/rpc-protocol';
/**
 * Worker specific implementation not returning any FileSystem details
 * Extending the common class
 */
export declare class WorkerEnvExtImpl extends EnvExtImpl {
    constructor(rpc: RPCProtocol);
    /**
     * Throw error for app-root as there is no filesystem in worker context
     */
    get appRoot(): string;
    get isNewAppInstall(): boolean;
}
//# sourceMappingURL=worker-env-ext.d.ts.map