import { URI } from '@theia/core/shared/vscode-uri';
import * as theia from '@theia/plugin';
import * as rpc from '../../common/plugin-api-rpc';
import * as model from '../../common/plugin-api-rpc-model';
import { DocumentsExtImpl } from '../documents';
export declare class TypeHierarchyAdapter {
    private readonly provider;
    private readonly documents;
    private readonly idGenerator;
    protected readonly cache: Map<string, Map<string, theia.TypeHierarchyItem>>;
    constructor(provider: theia.TypeHierarchyProvider, documents: DocumentsExtImpl);
    private fromTypeHierarchyItem;
    prepareSession(uri: URI, position: rpc.Position, token: theia.CancellationToken): Promise<model.TypeHierarchyItem[] | undefined>;
    provideSupertypes(sessionId: string, itemId: string, token: theia.CancellationToken): Promise<model.TypeHierarchyItem[] | undefined>;
    provideSubtypes(sessionId: string, itemId: string, token: theia.CancellationToken): Promise<model.TypeHierarchyItem[] | undefined>;
    private fetchItemFromCatch;
    releaseSession(session?: string): Promise<boolean>;
}
//# sourceMappingURL=type-hierarchy.d.ts.map