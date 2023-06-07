import { URI } from '@theia/core/shared/vscode-uri';
import * as theia from '@theia/plugin';
import { DocumentsExtImpl } from '../documents';
import { Position } from '../../common/plugin-api-rpc';
import { Definition } from '../../common/plugin-api-rpc-model';
export declare class DefinitionAdapter {
    private readonly delegate;
    private readonly documents;
    constructor(delegate: theia.DefinitionProvider, documents: DocumentsExtImpl);
    provideDefinition(resource: URI, position: Position, token: theia.CancellationToken): Promise<Definition | undefined>;
}
//# sourceMappingURL=definition.d.ts.map