import { TextEditorsMain, TextEditorConfigurationUpdate, Selection, TextEditorRevealType, SingleEditOperation, ApplyEditsOptions, UndoStopOptions, DecorationRenderOptions, ThemeDecorationInstanceRenderOptions, DecorationOptions, WorkspaceEditDto, DocumentsMain, WorkspaceEditMetadataDto } from '../../common/plugin-api-rpc';
import { Range, TextDocumentShowOptions } from '../../common/plugin-api-rpc-model';
import { EditorsAndDocumentsMain } from './editors-and-documents-main';
import { RPCProtocol } from '../../common/rpc-protocol';
import { Disposable } from '@theia/core/lib/common/disposable';
import { MonacoBulkEditService } from '@theia/monaco/lib/browser/monaco-bulk-edit-service';
import { MonacoEditorService } from '@theia/monaco/lib/browser/monaco-editor-service';
import { UriComponents } from '../../common/uri-components';
import { IDecorationRenderOptions } from '@theia/monaco-editor-core/esm/vs/editor/common/editorCommon';
export declare class TextEditorsMainImpl implements TextEditorsMain, Disposable {
    private readonly editorsAndDocuments;
    private readonly documents;
    private readonly bulkEditService;
    private readonly monacoEditorService;
    private readonly proxy;
    private readonly toDispose;
    private readonly editorsToDispose;
    private readonly fileEndpoint;
    constructor(editorsAndDocuments: EditorsAndDocumentsMain, documents: DocumentsMain, rpc: RPCProtocol, bulkEditService: MonacoBulkEditService, monacoEditorService: MonacoEditorService);
    dispose(): void;
    private onTextEditorAdd;
    private onTextEditorRemove;
    $tryShowTextDocument(uri: UriComponents, options?: TextDocumentShowOptions): Promise<void>;
    $trySetOptions(id: string, options: TextEditorConfigurationUpdate): Promise<void>;
    $trySetSelections(id: string, selections: Selection[]): Promise<void>;
    $tryRevealRange(id: string, range: Range, revealType: TextEditorRevealType): Promise<void>;
    $tryApplyEdits(id: string, modelVersionId: number, edits: SingleEditOperation[], opts: ApplyEditsOptions): Promise<boolean>;
    $tryApplyWorkspaceEdit(dto: WorkspaceEditDto, metadata?: WorkspaceEditMetadataDto): Promise<boolean>;
    $tryInsertSnippet(id: string, template: string, ranges: Range[], opts: UndoStopOptions): Promise<boolean>;
    $registerTextEditorDecorationType(key: string, options: DecorationRenderOptions | IDecorationRenderOptions): void;
    protected injectRemoteUris(options: DecorationRenderOptions | ThemeDecorationInstanceRenderOptions): void;
    protected toRemoteUri(uri?: UriComponents): UriComponents | undefined;
    $removeTextEditorDecorationType(key: string): void;
    $tryHideEditor(id: string): Promise<void>;
    $trySetDecorations(id: string, key: string, ranges: DecorationOptions[]): Promise<void>;
    $trySetDecorationsFast(id: string, key: string, ranges: number[]): Promise<void>;
    $saveAll(includeUntitled?: boolean): Promise<boolean>;
}
//# sourceMappingURL=text-editors-main.d.ts.map