import * as theia from '@theia/plugin';
import { ChainedCacheId, InlayHint, Range } from '../../common/plugin-api-rpc-model';
import { CommandRegistryImpl } from '../command-registry';
import { DocumentsExtImpl } from '../documents';
import { InlayHintsDto } from '../../common';
import { URI } from '@theia/core/shared/vscode-uri';
export declare class InlayHintsAdapter {
    private readonly provider;
    private readonly documents;
    private readonly commands;
    private cache;
    private readonly disposables;
    constructor(provider: theia.InlayHintsProvider, documents: DocumentsExtImpl, commands: CommandRegistryImpl);
    provideInlayHints(resource: URI, range: Range, token: theia.CancellationToken): Promise<InlayHintsDto | undefined>;
    resolveInlayHint(id: ChainedCacheId, token: theia.CancellationToken): Promise<InlayHint | undefined>;
    private isValidInlayHint;
    private convertInlayHint;
    releaseHints(id: number): Promise<void>;
}
//# sourceMappingURL=inlay-hints.d.ts.map