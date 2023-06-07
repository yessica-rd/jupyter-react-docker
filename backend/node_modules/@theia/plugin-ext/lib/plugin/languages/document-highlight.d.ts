import { URI } from '@theia/core/shared/vscode-uri';
import * as theia from '@theia/plugin';
import { DocumentsExtImpl } from '../documents';
import { Position } from '../../common/plugin-api-rpc';
import { DocumentHighlight } from '../../common/plugin-api-rpc-model';
export declare class DocumentHighlightAdapter {
    private readonly provider;
    private readonly documents;
    constructor(provider: theia.DocumentHighlightProvider, documents: DocumentsExtImpl);
    provideDocumentHighlights(resource: URI, position: Position, token: theia.CancellationToken): Promise<DocumentHighlight[] | undefined>;
    private isDocumentHighlightArray;
}
//# sourceMappingURL=document-highlight.d.ts.map