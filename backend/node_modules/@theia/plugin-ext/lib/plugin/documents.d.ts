/**
 * based on https://github.com/Microsoft/vscode/blob/bf9a27ec01f2ef82fc45f69e0c946c7d74a57d3e/src/vs/workbench/api/node/extHostDocumentSaveParticipant.ts
 */
import { DocumentsExt, ModelChangedEvent, SingleEditOperation } from '../common/plugin-api-rpc';
import { URI } from './types-impl';
import { UriComponents } from '../common/uri-components';
import { RPCProtocol } from '../common/rpc-protocol';
import { Event } from '@theia/core/lib/common/event';
import * as theia from '@theia/plugin';
import { DocumentDataExt } from './document-data';
import { EditorsAndDocumentsExtImpl } from './editors-and-documents';
export declare class DocumentsExtImpl implements DocumentsExt {
    private editorsAndDocuments;
    private toDispose;
    private _onDidAddDocument;
    private _onDidRemoveDocument;
    private _onDidChangeDocument;
    private _onDidSaveTextDocument;
    private _onWillSaveTextDocument;
    readonly onDidAddDocument: Event<theia.TextDocument>;
    readonly onDidRemoveDocument: Event<theia.TextDocument>;
    readonly onDidChangeDocument: Event<theia.TextDocumentChangeEvent>;
    readonly onDidSaveTextDocument: Event<theia.TextDocument>;
    readonly onWillSaveTextDocument: Event<theia.TextDocumentWillSaveEvent>;
    private proxy;
    private loadingDocuments;
    constructor(rpc: RPCProtocol, editorsAndDocuments: EditorsAndDocumentsExtImpl);
    $acceptModelModeChanged(startUrl: UriComponents, oldModeId: string, newModeId: string): void;
    $acceptModelSaved(strUrl: UriComponents): void;
    $acceptModelWillSave(strUrl: UriComponents, reason: theia.TextDocumentSaveReason, saveTimeout: number): Promise<SingleEditOperation[]>;
    protected fireTextDocumentWillSaveEvent({ document, reason, fireEvent, accept }: {
        document: theia.TextDocument;
        reason: theia.TextDocumentSaveReason;
        fireEvent: (e: theia.TextDocumentWillSaveEvent) => any;
        accept: (operation: SingleEditOperation) => void;
    }): Promise<void>;
    $acceptDirtyStateChanged(strUrl: UriComponents, isDirty: boolean): void;
    $acceptModelChanged(strUrl: UriComponents, e: ModelChangedEvent, isDirty: boolean): void;
    getAllDocumentData(): DocumentDataExt[];
    getDocumentData(resource: theia.Uri): DocumentDataExt | undefined;
    getDocument(resource: theia.Uri): theia.TextDocument;
    /**
     * Retrieve document and open it in the editor if need.
     *
     * @param uri path to the resource
     * @param options if options exists, resource will be opened in editor, otherwise only document object is returned
     */
    showDocument(uri: URI, options?: theia.TextDocumentShowOptions): Promise<DocumentDataExt | undefined>;
    openDocument(uri: URI): Promise<DocumentDataExt | undefined>;
    private loadDocument;
    createDocumentData(options?: {
        language?: string;
        content?: string;
    }): Promise<URI>;
    setWordDefinitionFor(modeId: string, wordDefinition: RegExp | null): void;
}
//# sourceMappingURL=documents.d.ts.map