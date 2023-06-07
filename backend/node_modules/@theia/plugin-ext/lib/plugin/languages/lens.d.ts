import { URI } from '@theia/core/shared/vscode-uri';
import * as theia from '@theia/plugin';
import { DocumentsExtImpl } from '../documents';
import { CodeLensSymbol } from '../../common/plugin-api-rpc-model';
import { CommandRegistryImpl } from '../command-registry';
/** Adapts the calls from main to extension thread for providing/resolving the code lenses. */
export declare class CodeLensAdapter {
    private readonly provider;
    private readonly documents;
    private readonly commands;
    private static readonly BAD_CMD;
    private cacheId;
    private readonly cache;
    private readonly disposables;
    constructor(provider: theia.CodeLensProvider, documents: DocumentsExtImpl, commands: CommandRegistryImpl);
    provideCodeLenses(resource: URI, token: theia.CancellationToken): Promise<CodeLensSymbol[] | undefined>;
    resolveCodeLens(resource: URI, symbol: CodeLensSymbol, token: theia.CancellationToken): Promise<CodeLensSymbol | undefined>;
    releaseCodeLenses(ids: number[]): void;
}
//# sourceMappingURL=lens.d.ts.map