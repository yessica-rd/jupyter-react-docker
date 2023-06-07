import * as theia from '@theia/plugin';
import * as rpc from '../../common/plugin-api-rpc';
import { DocumentsExtImpl } from '../documents';
import { LinkedEditingRanges } from '../../common/plugin-api-rpc-model';
import { URI } from '@theia/core/shared/vscode-uri';
export declare class LinkedEditingRangeAdapter {
    private readonly documents;
    private readonly provider;
    constructor(documents: DocumentsExtImpl, provider: theia.LinkedEditingRangeProvider);
    provideRanges(resource: URI, position: rpc.Position, token: theia.CancellationToken): Promise<LinkedEditingRanges | undefined>;
}
//# sourceMappingURL=linked-editing-range.d.ts.map