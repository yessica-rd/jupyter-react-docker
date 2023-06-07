import { BinaryBuffer } from '@theia/core/lib/common/buffer';
import * as theia from '@theia/plugin';
import { URI } from '@theia/core/shared/vscode-uri';
import { DocumentsExtImpl } from '../documents';
import { Range } from '../../common/plugin-api-rpc-model';
export declare class DocumentSemanticTokensAdapter {
    private readonly _documents;
    private readonly _provider;
    private readonly _previousResults;
    private _nextResultId;
    constructor(_documents: DocumentsExtImpl, _provider: theia.DocumentSemanticTokensProvider);
    provideDocumentSemanticTokens(resource: URI, previousResultId: number, token: theia.CancellationToken): Promise<BinaryBuffer | null>;
    releaseDocumentSemanticColoring(semanticColoringResultId: number): Promise<void>;
    private static _fixProvidedSemanticTokens;
    private static _isSemanticTokens;
    private static _isCorrectSemanticTokens;
    private static _isSemanticTokensEdits;
    private static _isCorrectSemanticTokensEdits;
    private static _convertToEdits;
    private _send;
}
export declare class DocumentRangeSemanticTokensAdapter {
    private readonly _documents;
    private readonly _provider;
    constructor(_documents: DocumentsExtImpl, _provider: theia.DocumentRangeSemanticTokensProvider);
    provideDocumentRangeSemanticTokens(resource: URI, range: Range, token: theia.CancellationToken): Promise<BinaryBuffer | null>;
    private _send;
}
//# sourceMappingURL=semantic-highlighting.d.ts.map