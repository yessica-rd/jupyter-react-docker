import { EnvExtImpl } from '../env';
import { RPCProtocol } from '../../common/rpc-protocol';
/**
 * Provides machineId using mac address. It's only possible on node side
 * Extending the common class
 */
export declare class EnvNodeExtImpl extends EnvExtImpl {
    private macMachineId;
    private _isNewAppInstall;
    constructor(rpc: RPCProtocol);
    /**
     * override machineID
     */
    get machineId(): string;
    /**
     * Provides application root.
     */
    get appRoot(): string;
    get isNewAppInstall(): boolean;
    private computeIsNewAppInstall;
}
//# sourceMappingURL=env-node-ext.d.ts.map