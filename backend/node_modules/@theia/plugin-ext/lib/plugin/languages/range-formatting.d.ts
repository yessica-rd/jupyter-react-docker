import * as theia from '@theia/plugin';
import { DocumentsExtImpl } from '../documents';
import { URI } from '@theia/core/shared/vscode-uri';
import { FormattingOptions, TextEdit, Range } from '../../common/plugin-api-rpc-model';
export declare class RangeFormattingAdapter {
    private readonly provider;
    private readonly documents;
    constructor(provider: theia.DocumentRangeFormattingEditProvider, documents: DocumentsExtImpl);
    provideDocumentRangeFormattingEdits(resource: URI, range: Range, options: FormattingOptions, token: theia.CancellationToken): Promise<TextEdit[] | undefined>;
}
//# sourceMappingURL=range-formatting.d.ts.map