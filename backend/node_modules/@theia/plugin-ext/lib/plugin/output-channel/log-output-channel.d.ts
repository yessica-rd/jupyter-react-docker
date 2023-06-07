import { Emitter } from '@theia/core/shared/vscode-languageserver-protocol';
import * as theia from '@theia/plugin';
import { OutputChannelRegistryMain, PluginInfo } from '../../common/plugin-api-rpc';
import { OutputChannelImpl } from './output-channel-item';
export declare class LogOutputChannelImpl extends OutputChannelImpl implements theia.LogOutputChannel {
    readonly onDidChangeLogLevelEmitter: Emitter<theia.LogLevel>;
    readonly onDidChangeLogLevel: theia.Event<theia.LogLevel>;
    logLevel: theia.LogLevel;
    constructor(name: string, proxy: OutputChannelRegistryMain, pluginInfo: PluginInfo);
    setLogLevel(level: theia.LogLevel): void;
    getLogLevel(): theia.LogLevel;
    append(value: string): void;
    appendLine(value: string): void;
    dispose(): void;
    protected log(level: theia.LogLevel, message: string): void;
    private checkLogLevel;
    trace(message: string, ...args: any[]): void;
    debug(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    error(errorMsg: string | Error, ...args: any[]): void;
    private format;
}
//# sourceMappingURL=log-output-channel.d.ts.map