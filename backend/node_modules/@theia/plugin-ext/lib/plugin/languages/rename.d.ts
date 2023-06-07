import { URI } from '@theia/core/shared/vscode-uri';
import * as theia from '@theia/plugin';
import * as model from '../../common/plugin-api-rpc-model';
import { DocumentsExtImpl } from '../documents';
import { Position, WorkspaceEditDto } from '../../common/plugin-api-rpc';
export declare class RenameAdapter {
    private readonly provider;
    private readonly documents;
    static supportsResolving(provider: theia.RenameProvider): boolean;
    constructor(provider: theia.RenameProvider, documents: DocumentsExtImpl);
    provideRenameEdits(resource: URI, position: Position, newName: string, token: theia.CancellationToken): Promise<WorkspaceEditDto | undefined>;
    resolveRenameLocation(resource: URI, position: Position, token: theia.CancellationToken): Promise<model.RenameLocation & model.Rejection | undefined>;
    private static asMessage;
}
//# sourceMappingURL=rename.d.ts.map