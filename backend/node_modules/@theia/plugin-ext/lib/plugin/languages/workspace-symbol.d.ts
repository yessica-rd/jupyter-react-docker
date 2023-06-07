import { SymbolInformation } from '@theia/core/shared/vscode-languageserver-protocol';
import * as theia from '@theia/plugin';
export declare class WorkspaceSymbolAdapter {
    private readonly provider;
    constructor(provider: theia.WorkspaceSymbolProvider);
    provideWorkspaceSymbols(query: string, token: theia.CancellationToken): Promise<SymbolInformation[]>;
    resolveWorkspaceSymbol(symbol: SymbolInformation, token: theia.CancellationToken): Promise<SymbolInformation>;
}
//# sourceMappingURL=workspace-symbol.d.ts.map