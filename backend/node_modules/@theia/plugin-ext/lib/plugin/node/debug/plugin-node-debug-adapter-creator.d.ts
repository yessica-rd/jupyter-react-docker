import { PluginDebugAdapterCreator } from '../../debug/plugin-debug-adapter-creator';
import * as theia from '@theia/plugin';
import { PlatformSpecificAdapterContribution, PluginPackageDebuggersContribution } from '../../../common';
import { DebugAdapter } from '@theia/debug/lib/common/debug-model';
import { DebugAdapterExecutable, DebugAdapterNamedPipeServer, DebugAdapterServer } from '../../types-impl';
import { SocketDebugAdapter } from '@theia/debug/lib/node/stream-debug-adapter';
export declare class NodeDebugAdapterCreator extends PluginDebugAdapterCreator {
    resolveDebugAdapterExecutable(pluginPath: string, debuggerContribution: PluginPackageDebuggersContribution): Promise<theia.DebugAdapterExecutable | undefined>;
    createDebugAdapter(session: theia.DebugSession, debugConfiguration: theia.DebugConfiguration, executable: theia.DebugAdapterExecutable | undefined, descriptorFactory: theia.DebugAdapterDescriptorFactory | undefined): Promise<DebugAdapter>;
    protected toPlatformInfo(executable: PluginPackageDebuggersContribution): PlatformSpecificAdapterContribution | undefined;
    startDebugAdapter(executable: DebugAdapterExecutable): DebugAdapter;
    /**
     * Connects to a remote debug server.
     */
    connectSocketDebugAdapter(server: DebugAdapterServer): SocketDebugAdapter;
    connectPipeDebugAdapter(adapter: DebugAdapterNamedPipeServer): SocketDebugAdapter;
}
//# sourceMappingURL=plugin-node-debug-adapter-creator.d.ts.map