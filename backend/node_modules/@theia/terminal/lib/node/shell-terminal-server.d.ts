import { ILogger } from '@theia/core/lib/common/logger';
import { EnvironmentUtils } from '@theia/core/lib/node/environment-utils';
import { IShellTerminalServerOptions } from '../common/shell-terminal-protocol';
import { BaseTerminalServer } from './base-terminal-server';
import { ShellProcessFactory } from './shell-process';
import { ProcessManager } from '@theia/process/lib/node';
export declare class ShellTerminalServer extends BaseTerminalServer {
    protected readonly shellFactory: ShellProcessFactory;
    protected environmentUtils: EnvironmentUtils;
    constructor(shellFactory: ShellProcessFactory, processManager: ProcessManager, logger: ILogger);
    create(options: IShellTerminalServerOptions): Promise<number>;
    private spawnAsPromised;
    hasChildProcesses(processId: number | undefined): Promise<boolean>;
}
//# sourceMappingURL=shell-terminal-server.d.ts.map