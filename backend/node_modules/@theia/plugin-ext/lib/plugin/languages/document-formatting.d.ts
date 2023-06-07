import * as theia from '@theia/plugin';
import { DocumentsExtImpl } from '../documents';
import { URI } from '@theia/core/shared/vscode-uri';
import { FormattingOptions, TextEdit } from '../../common/plugin-api-rpc-model';
export declare class DocumentFormattingAdapter {
    private readonly provider;
    private readonly documents;
    constructor(provider: theia.DocumentFormattingEditProvider, documents: DocumentsExtImpl);
    provideDocumentFormattingEdits(resource: URI, options: FormattingOptions, token: theia.CancellationToken): Promise<TextEdit[] | undefined>;
}
//# sourceMappingURL=document-formatting.d.ts.map