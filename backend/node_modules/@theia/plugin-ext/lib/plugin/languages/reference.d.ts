import { URI } from '@theia/core/shared/vscode-uri';
import * as theia from '@theia/plugin';
import { DocumentsExtImpl } from '../documents';
import { ReferenceContext, Location } from '../../common/plugin-api-rpc-model';
import { Position } from '../../common/plugin-api-rpc';
export declare class ReferenceAdapter {
    private readonly provider;
    private readonly documents;
    constructor(provider: theia.ReferenceProvider, documents: DocumentsExtImpl);
    provideReferences(resource: URI, position: Position, context: ReferenceContext, token: theia.CancellationToken): Promise<Location[] | undefined>;
}
//# sourceMappingURL=reference.d.ts.map