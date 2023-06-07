import * as theia from '@theia/plugin';
import { RPCProtocol } from '../common/rpc-protocol';
import { QueryParameters } from '../common/env';
export declare abstract class EnvExtImpl {
    private proxy;
    private queryParameters;
    private lang;
    private applicationName;
    private defaultShell;
    private ui;
    private envMachineId;
    private envSessionId;
    private host;
    private _remoteName;
    constructor(rpc: RPCProtocol);
    getEnvVariable(envVarName: string): Promise<string | undefined>;
    getQueryParameter(queryParamName: string): string | string[] | undefined;
    getQueryParameters(): QueryParameters;
    setQueryParameters(queryParams: QueryParameters): void;
    setApplicationName(applicationName: string): void;
    setLanguage(lang: string): void;
    setShell(shell: string): void;
    setUIKind(uiKind: theia.UIKind): void;
    setAppHost(appHost: string): void;
    getClientOperatingSystem(): Promise<theia.OperatingSystem>;
    get appName(): string;
    abstract get appRoot(): string;
    abstract get isNewAppInstall(): boolean;
    get appHost(): string;
    get remoteName(): string | undefined;
    get language(): string;
    get machineId(): string;
    get sessionId(): string;
    get uriScheme(): string;
    get shell(): string;
    get uiKind(): theia.UIKind;
}
//# sourceMappingURL=env.d.ts.map