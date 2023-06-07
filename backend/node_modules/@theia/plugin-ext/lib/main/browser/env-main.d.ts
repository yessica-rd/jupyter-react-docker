import { interfaces } from '@theia/core/shared/inversify';
import { RPCProtocol } from '../../common/rpc-protocol';
import { EnvMain } from '../../common/plugin-api-rpc';
import { QueryParameters } from '../../common/env';
import { OperatingSystem } from '../../plugin/types-impl';
export declare class EnvMainImpl implements EnvMain {
    private envVariableServer;
    constructor(rpc: RPCProtocol, container: interfaces.Container);
    $getEnvVariable(envVarName: string): Promise<string | undefined>;
    $getClientOperatingSystem(): Promise<OperatingSystem>;
}
/**
 * Returns query parameters from current page.
 */
export declare function getQueryParameters(): QueryParameters;
//# sourceMappingURL=env-main.d.ts.map