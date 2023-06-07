import { URI } from '@theia/core/shared/vscode-uri';
import * as theia from '@theia/plugin';
import { DocumentsExtImpl } from '../documents';
import { DocumentSymbol } from '../../common/plugin-api-rpc-model';
/** Adapts the calls from main to extension thread for providing the document symbols. */
export declare class OutlineAdapter {
    private readonly documents;
    private readonly provider;
    constructor(documents: DocumentsExtImpl, provider: theia.DocumentSymbolProvider);
    provideDocumentSymbols(resource: URI, token: theia.CancellationToken): Promise<DocumentSymbol[] | undefined>;
    private static asDocumentSymbolTree;
    /**
     * Test if `otherRange` is in `range`. If the ranges are equal, will return true.
     */
    private static containsRange;
    /**
     * Test if range `a` equals `b`.
     */
    private static equalsRange;
}
//# sourceMappingURL=outline.d.ts.map