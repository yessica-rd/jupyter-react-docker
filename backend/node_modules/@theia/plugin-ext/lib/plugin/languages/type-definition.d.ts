import { URI } from '@theia/core/shared/vscode-uri';
import * as theia from '@theia/plugin';
import { DocumentsExtImpl } from '../documents';
import { Position } from '../../common/plugin-api-rpc';
import { Definition } from '../../common/plugin-api-rpc-model';
export declare class TypeDefinitionAdapter {
    private readonly provider;
    private readonly documents;
    constructor(provider: theia.TypeDefinitionProvider, documents: DocumentsExtImpl);
    provideTypeDefinition(resource: URI, position: Position, token: theia.CancellationToken): Promise<Definition | undefined>;
}
//# sourceMappingURL=type-definition.d.ts.map