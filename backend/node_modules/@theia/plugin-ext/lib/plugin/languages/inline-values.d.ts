import { URI } from '@theia/core/shared/vscode-uri';
import * as theia from '@theia/plugin';
import { InlineValue, InlineValueContext, Range } from '../../common/plugin-api-rpc-model';
import { DocumentsExtImpl } from '../documents';
export declare class InlineValuesAdapter {
    private readonly provider;
    private readonly documents;
    constructor(provider: theia.InlineValuesProvider, documents: DocumentsExtImpl);
    provideInlineValues(resource: URI, range: Range, context: InlineValueContext, token: theia.CancellationToken): Promise<InlineValue[] | undefined>;
}
//# sourceMappingURL=inline-values.d.ts.map