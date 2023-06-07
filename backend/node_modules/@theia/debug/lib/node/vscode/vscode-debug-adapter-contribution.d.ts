import { DebugAdapterExecutable, DebugAdapterContribution } from '../../common/debug-model';
import { IJSONSchema, IJSONSchemaSnippet } from '@theia/core/lib/common/json-schema';
export interface VSCodeExtensionPackage {
    contributes: {
        debuggers: VSCodeDebuggerContribution[];
    };
}
export interface VSCodePlatformSpecificAdapterContribution {
    program?: string;
    args?: string[];
    runtime?: string;
    runtimeArgs?: string[];
}
export interface VSCodeDebuggerContribution extends VSCodePlatformSpecificAdapterContribution {
    type: string;
    label?: string;
    languages?: string[];
    configurationSnippets?: IJSONSchemaSnippet[];
    configurationAttributes?: {
        [request: string]: IJSONSchema;
    };
    win?: VSCodePlatformSpecificAdapterContribution;
    winx86?: VSCodePlatformSpecificAdapterContribution;
    windows?: VSCodePlatformSpecificAdapterContribution;
    osx?: VSCodePlatformSpecificAdapterContribution;
    linux?: VSCodePlatformSpecificAdapterContribution;
}
export declare namespace VSCodeDebuggerContribution {
    function toPlatformInfo(executable: VSCodeDebuggerContribution): VSCodePlatformSpecificAdapterContribution | undefined;
}
export declare abstract class AbstractVSCodeDebugAdapterContribution implements DebugAdapterContribution {
    readonly type: string;
    readonly extensionPath: string;
    protected readonly pckPath: string;
    protected readonly pck: Promise<VSCodeExtensionPackage>;
    protected readonly debuggerContribution: Promise<VSCodeDebuggerContribution>;
    readonly label: Promise<string | undefined>;
    readonly languages: Promise<string[] | undefined>;
    constructor(type: string, extensionPath: string);
    protected parse(): Promise<VSCodeExtensionPackage>;
    protected resolveDebuggerContribution(): Promise<VSCodeDebuggerContribution>;
    protected schemaAttributes: Promise<IJSONSchema[]> | undefined;
    getSchemaAttributes(): Promise<IJSONSchema[]>;
    protected resolveSchemaAttributes(): Promise<IJSONSchema[]>;
    getConfigurationSnippets(): Promise<IJSONSchemaSnippet[]>;
    provideDebugAdapterExecutable(): Promise<DebugAdapterExecutable | undefined>;
}
//# sourceMappingURL=vscode-debug-adapter-contribution.d.ts.map