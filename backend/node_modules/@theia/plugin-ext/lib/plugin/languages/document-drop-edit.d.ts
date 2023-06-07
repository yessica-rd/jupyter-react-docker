import * as theia from '@theia/plugin';
import { DataTransferDTO, DocumentDropEdit } from '../../common/plugin-api-rpc-model';
import { CancellationToken } from '@theia/core/shared/vscode-languageserver-protocol';
import { Position } from '../../common/plugin-api-rpc';
import { DocumentsExtImpl } from '../documents';
import { URI } from '@theia/core/shared/vscode-uri';
import { FileSystemExtImpl } from '../file-system-ext-impl';
export declare class DocumentDropEditAdapter {
    private readonly provider;
    private readonly documents;
    private readonly fileSystem;
    constructor(provider: theia.DocumentDropEditProvider, documents: DocumentsExtImpl, fileSystem: FileSystemExtImpl);
    provideDocumentDropEdits(resource: URI, position: Position, dataTransfer: DataTransferDTO, token: CancellationToken): Promise<DocumentDropEdit | undefined>;
    private resolveFileData;
}
//# sourceMappingURL=document-drop-edit.d.ts.map