import * as theia from '@theia/plugin';
import { URI } from '@theia/core/shared/vscode-uri';
import { Selection, WorkspaceEditDto } from '../../common/plugin-api-rpc';
import { Range, CodeActionContext, CodeAction } from '../../common/plugin-api-rpc-model';
import { DocumentsExtImpl } from '../documents';
import { Diagnostics } from './diagnostics';
import { CommandRegistryImpl } from '../command-registry';
export declare class CodeActionAdapter {
    private readonly provider;
    private readonly document;
    private readonly diagnostics;
    private readonly pluginId;
    private readonly commands;
    constructor(provider: theia.CodeActionProvider, document: DocumentsExtImpl, diagnostics: Diagnostics, pluginId: string, commands: CommandRegistryImpl);
    private readonly cache;
    private readonly disposables;
    private cacheId;
    provideCodeAction(resource: URI, rangeOrSelection: Range | Selection, context: CodeActionContext, token: theia.CancellationToken): Promise<CodeAction[] | undefined>;
    releaseCodeActions(cacheIds: number[]): Promise<void>;
    resolveCodeAction(cacheId: number, token: theia.CancellationToken): Promise<WorkspaceEditDto | undefined>;
    private nextCacheId;
    private static _isCommand;
    private static _isSelection;
}
//# sourceMappingURL=code-action.d.ts.map