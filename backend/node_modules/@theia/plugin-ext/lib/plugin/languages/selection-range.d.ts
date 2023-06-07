import * as theia from '@theia/plugin';
import { DocumentsExtImpl } from '../documents';
import { URI } from '@theia/core/shared/vscode-uri';
import * as model from '../../common/plugin-api-rpc-model';
import { Position } from '../../common/plugin-api-rpc';
export declare class SelectionRangeProviderAdapter {
    private readonly provider;
    private readonly documents;
    constructor(provider: theia.SelectionRangeProvider, documents: DocumentsExtImpl);
    provideSelectionRanges(resource: URI, position: Position[], token: theia.CancellationToken): Promise<model.SelectionRange[][]>;
}
//# sourceMappingURL=selection-range.d.ts.map