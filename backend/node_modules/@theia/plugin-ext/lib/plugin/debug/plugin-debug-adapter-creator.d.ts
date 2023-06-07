import * as theia from '@theia/plugin';
import { DebugAdapter } from '@theia/debug/lib/common/debug-model';
import { PluginPackageDebuggersContribution } from '../../common';
import { DebugAdapterInlineImplementation } from '../types-impl';
import { InlineDebugAdapter } from '@theia/debug/lib/common/inline-debug-adapter';
export declare class PluginDebugAdapterCreator {
    resolveDebugAdapterExecutable(_pluginPath: string, _debuggerContribution: PluginPackageDebuggersContribution): Promise<theia.DebugAdapterExecutable | undefined>;
    createDebugAdapter(session: theia.DebugSession, _debugConfiguration: theia.DebugConfiguration, executable: theia.DebugAdapterExecutable | undefined, descriptorFactory: theia.DebugAdapterDescriptorFactory | undefined): Promise<DebugAdapter>;
    connectInlineDebugAdapter(adapter: DebugAdapterInlineImplementation): InlineDebugAdapter;
}
//# sourceMappingURL=plugin-debug-adapter-creator.d.ts.map