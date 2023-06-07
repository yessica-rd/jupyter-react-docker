import * as theia from '@theia/plugin';
import { Breakpoint } from '../../common/plugin-api-rpc-model';
import { DebugConfigurationProviderTriggerKind, DebugExt, TerminalOptionsExt } from '../../common/plugin-api-rpc';
import { PluginPackageDebuggersContribution } from '../../common/plugin-protocol';
import { RPCProtocol } from '../../common/rpc-protocol';
import { CommandRegistryImpl } from '../command-registry';
import { ConnectionImpl } from '../../common/connection';
import { Disposable, Breakpoint as BreakpointExt } from '../types-impl';
import { DebugAdapter } from '@theia/debug/lib/common/debug-model';
import { DebugConfiguration } from '@theia/debug/lib/common/debug-configuration';
export declare class DebugExtImpl implements DebugExt {
    private sessions;
    private configurationProviderHandleGenerator;
    private configurationProviders;
    /**
     * Only use internally, don't send it to the frontend. It's expensive!
     * It's already there as a part of the plugin metadata.
     */
    private debuggersContributions;
    private descriptorFactories;
    private trackerFactories;
    private contributionPaths;
    private contributionTypes;
    private connectionExt;
    private commandRegistryExt;
    private proxy;
    private readonly onDidChangeBreakpointsEmitter;
    private readonly onDidChangeActiveDebugSessionEmitter;
    private readonly onDidTerminateDebugSessionEmitter;
    private readonly onDidCreateDebugSessionEmitter;
    private readonly onDidStartDebugSessionEmitter;
    private readonly onDidReceiveDebugSessionCustomEmitter;
    activeDebugSession: theia.DebugSession | undefined;
    activeDebugConsole: theia.DebugConsole;
    private readonly _breakpoints;
    private frontendAdapterCreator;
    private backendAdapterCreator;
    get breakpoints(): theia.Breakpoint[];
    constructor(rpc: RPCProtocol);
    /**
     * Sets dependencies.
     */
    assistedInject(connectionExt: ConnectionImpl, commandRegistryExt: CommandRegistryImpl): void;
    /**
     * Registers contributions.
     * @param pluginFolder plugin folder path
     * @param pluginType plugin type
     * @param contributions available debuggers contributions
     */
    registerDebuggersContributions(pluginFolder: string, pluginType: theia.PluginType, contributions: PluginPackageDebuggersContribution[]): void;
    get onDidReceiveDebugSessionCustomEvent(): theia.Event<theia.DebugSessionCustomEvent>;
    get onDidChangeActiveDebugSession(): theia.Event<theia.DebugSession | undefined>;
    get onDidTerminateDebugSession(): theia.Event<theia.DebugSession>;
    get onDidCreateDebugSession(): theia.Event<theia.DebugSession>;
    get onDidStartDebugSession(): theia.Event<theia.DebugSession>;
    get onDidChangeBreakpoints(): theia.Event<theia.BreakpointsChangeEvent>;
    addBreakpoints(breakpoints: readonly theia.Breakpoint[]): void;
    removeBreakpoints(breakpoints: readonly theia.Breakpoint[]): void;
    startDebugging(folder: theia.WorkspaceFolder | undefined, nameOrConfiguration: string | theia.DebugConfiguration, options: theia.DebugSessionOptions): PromiseLike<boolean>;
    stopDebugging(session?: theia.DebugSession): PromiseLike<void>;
    asDebugSourceUri(source: theia.DebugProtocolSource, session?: theia.DebugSession): theia.Uri;
    private getDebugSourceUri;
    registerDebugAdapterDescriptorFactory(debugType: string, factory: theia.DebugAdapterDescriptorFactory): Disposable;
    registerDebugAdapterTrackerFactory(debugType: string, factory: theia.DebugAdapterTrackerFactory): Disposable;
    registerDebugConfigurationProvider(debugType: string, provider: theia.DebugConfigurationProvider, trigger: DebugConfigurationProviderTriggerKind): Disposable;
    $onSessionCustomEvent(sessionId: string, event: string, body?: any): Promise<void>;
    $sessionDidCreate(sessionId: string): Promise<void>;
    $sessionDidStart(sessionId: string): Promise<void>;
    $sessionDidDestroy(sessionId: string): Promise<void>;
    $sessionDidChange(sessionId: string | undefined): Promise<void>;
    $breakpointsDidChange(added: Breakpoint[], removed: string[], changed: Breakpoint[]): Promise<void>;
    protected toBreakpointExt({ functionName, location, enabled, condition, hitCondition, logMessage, id }: Breakpoint): BreakpointExt | undefined;
    $createDebugSession(debugConfiguration: DebugConfiguration, workspaceFolderUri: string | undefined): Promise<string>;
    $terminateDebugSession(sessionId: string): Promise<void>;
    $getTerminalCreationOptions(debugType: string): Promise<TerminalOptionsExt | undefined>;
    doGetTerminalCreationOptions(debugType: string): Promise<TerminalOptionsExt | undefined>;
    private getConfigurationProviderRecord;
    $provideDebugConfigurationsByHandle(handle: number, workspaceFolderUri: string | undefined): Promise<theia.DebugConfiguration[]>;
    $resolveDebugConfigurationByHandle(handle: number, workspaceFolderUri: string | undefined, debugConfiguration: theia.DebugConfiguration): Promise<theia.DebugConfiguration | undefined | null>;
    $resolveDebugConfigurationWithSubstitutedVariablesByHandle(handle: number, workspaceFolderUri: string | undefined, debugConfiguration: theia.DebugConfiguration): Promise<theia.DebugConfiguration | undefined | null>;
    protected createDebugAdapterTracker(session: theia.DebugSession): Promise<theia.DebugAdapterTracker>;
    protected createDebugAdapter(session: theia.DebugSession, debugConfiguration: theia.DebugConfiguration): Promise<DebugAdapter>;
    protected resolveDebugAdapterExecutable(debugConfiguration: theia.DebugConfiguration): Promise<theia.DebugAdapterExecutable | undefined>;
    private toWorkspaceFolder;
    private getAdapterCreator;
}
//# sourceMappingURL=debug-ext.d.ts.map