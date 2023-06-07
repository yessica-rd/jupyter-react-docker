import { URI } from '@theia/core/shared/vscode-uri';
import * as theia from '@theia/plugin';
import { DocumentsExtImpl } from '../documents';
import { Position } from '../../common/plugin-api-rpc';
import { CompletionContext, CompletionResultDto, Completion, ChainedCacheId } from '../../common/plugin-api-rpc-model';
import { CommandRegistryImpl } from '../command-registry';
export declare class CompletionAdapter {
    private readonly delegate;
    private readonly documents;
    private readonly commands;
    private cacheId;
    private readonly cache;
    private readonly disposables;
    constructor(delegate: theia.CompletionItemProvider, documents: DocumentsExtImpl, commands: CommandRegistryImpl);
    provideCompletionItems(resource: URI, position: Position, context: CompletionContext, token: theia.CancellationToken): Promise<CompletionResultDto | undefined>;
    resolveCompletionItem(chainedId: ChainedCacheId, token: theia.CancellationToken): Promise<Completion | undefined>;
    releaseCompletionItems(id: number): Promise<void>;
    private convertCompletionItem;
    static hasResolveSupport(provider: theia.CompletionItemProvider): boolean;
}
//# sourceMappingURL=completion.d.ts.map