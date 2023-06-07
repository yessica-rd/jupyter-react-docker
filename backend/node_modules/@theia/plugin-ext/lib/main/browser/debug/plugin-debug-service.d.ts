/// <reference types="lodash" />
import { DebuggerDescription, DebugService } from '@theia/debug/lib/common/debug-service';
import { Emitter, Event } from '@theia/core';
import { Disposable, DisposableCollection } from '@theia/core/lib/common/disposable';
import { DebugConfiguration } from '@theia/debug/lib/common/debug-configuration';
import { IJSONSchema, IJSONSchemaSnippet } from '@theia/core/lib/common/json-schema';
import { PluginDebugAdapterContribution } from './plugin-debug-adapter-contribution';
import { PluginDebugConfigurationProvider } from './plugin-debug-configuration-provider';
import { WebSocketConnectionProvider } from '@theia/core/lib/browser/messaging/ws-connection-provider';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import { CommandIdVariables } from '@theia/variable-resolver/lib/common/variable-types';
import { DebuggerContribution } from '../../../common/plugin-protocol';
import { DebugRequestTypes } from '@theia/debug/lib/browser/debug-session-connection';
import * as theia from '@theia/plugin';
/**
 * Debug service to work with plugin and extension contributions.
 */
export declare class PluginDebugService implements DebugService {
    protected readonly onDidChangeDebuggersEmitter: Emitter<void>;
    get onDidChangeDebuggers(): Event<void>;
    protected readonly debuggers: DebuggerContribution[];
    protected readonly contributors: Map<string, PluginDebugAdapterContribution>;
    protected readonly configurationProviders: Map<number, PluginDebugConfigurationProvider>;
    protected readonly toDispose: DisposableCollection;
    protected readonly onDidChangeDebugConfigurationProvidersEmitter: Emitter<void>;
    get onDidChangeDebugConfigurationProviders(): Event<void>;
    protected readonly sessionId2contrib: Map<string, PluginDebugAdapterContribution>;
    protected delegated: DebugService;
    protected readonly connectionProvider: WebSocketConnectionProvider;
    protected readonly workspaceService: WorkspaceService;
    protected init(): void;
    registerDebugAdapterContribution(contrib: PluginDebugAdapterContribution): Disposable;
    unregisterDebugAdapterContribution(debugType: string): void;
    fireOnDidConfigurationProvidersChanged: import("lodash").DebouncedFunc<() => void>;
    registerDebugConfigurationProvider(provider: PluginDebugConfigurationProvider): Disposable;
    unregisterDebugConfigurationProvider(handle: number): void;
    debugTypes(): Promise<string[]>;
    provideDebugConfigurations(debugType: keyof DebugRequestTypes, workspaceFolderUri: string | undefined): Promise<theia.DebugConfiguration[]>;
    fetchDynamicDebugConfiguration(name: string, providerType: string, folder?: string): Promise<DebugConfiguration | undefined>;
    provideDynamicDebugConfigurations(folder?: string): Promise<Record<string, DebugConfiguration[]>>;
    resolveDebugConfiguration(config: DebugConfiguration, workspaceFolderUri: string | undefined): Promise<DebugConfiguration | undefined | null>;
    resolveDebugConfigurationWithSubstitutedVariables(config: DebugConfiguration, workspaceFolderUri: string | undefined): Promise<DebugConfiguration | undefined | null>;
    protected resolveDebugConfigurationByResolversChain(config: DebugConfiguration, workspaceFolderUri: string | undefined, resolvers: ((folder: string | undefined, debugConfiguration: DebugConfiguration) => Promise<DebugConfiguration | null | undefined>)[]): Promise<DebugConfiguration | undefined | null>;
    registerDebugger(contribution: DebuggerContribution): Disposable;
    provideDebuggerVariables(debugType: string): Promise<CommandIdVariables>;
    getDebuggersForLanguage(language: string): Promise<DebuggerDescription[]>;
    getSchemaAttributes(debugType: string): Promise<IJSONSchema[]>;
    getConfigurationSnippets(): Promise<IJSONSchemaSnippet[]>;
    createDebugSession(config: DebugConfiguration, workspaceFolder: string | undefined): Promise<string>;
    terminateDebugSession(sessionId: string): Promise<void>;
    dispose(): void;
}
//# sourceMappingURL=plugin-debug-service.d.ts.map