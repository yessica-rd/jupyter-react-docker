import * as theia from '@theia/plugin';
import { DocumentsExtImpl } from '../documents';
import { URI } from '@theia/core/shared/vscode-uri';
import * as model from '../../common/plugin-api-rpc-model';
export declare class FoldingProviderAdapter {
    private readonly provider;
    private readonly documents;
    constructor(provider: theia.FoldingRangeProvider, documents: DocumentsExtImpl);
    provideFoldingRanges(resource: URI, context: model.FoldingContext, token: theia.CancellationToken): Promise<model.FoldingRange[] | undefined>;
}
//# sourceMappingURL=folding.d.ts.map