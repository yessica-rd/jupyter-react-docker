import { CustomEditorsExt, Plugin } from '../common/plugin-api-rpc';
import * as theia from '@theia/plugin';
import { RPCProtocol } from '../common/rpc-protocol';
import { UriComponents } from '../common/uri-components';
import { DocumentsExtImpl } from './documents';
import { WebviewsExtImpl } from './webviews';
import { CancellationToken } from '@theia/core/lib/common/cancellation';
import { WorkspaceExtImpl } from './workspace';
export declare class CustomEditorsExtImpl implements CustomEditorsExt {
    private readonly documentExt;
    private readonly webviewExt;
    private readonly workspace;
    private readonly proxy;
    private readonly editorProviders;
    private readonly documents;
    constructor(rpc: RPCProtocol, documentExt: DocumentsExtImpl, webviewExt: WebviewsExtImpl, workspace: WorkspaceExtImpl);
    registerCustomEditorProvider(viewType: string, provider: theia.CustomReadonlyEditorProvider | theia.CustomTextEditorProvider, options: {
        webviewOptions?: theia.WebviewPanelOptions;
        supportsMultipleEditorsPerDocument?: boolean;
    }, plugin: Plugin): theia.Disposable;
    $createCustomDocument(resource: UriComponents, viewType: string, openContext: theia.CustomDocumentOpenContext, cancellation: CancellationToken): Promise<{
        editable: boolean;
    }>;
    $disposeCustomDocument(resource: UriComponents, viewType: string): Promise<void>;
    $resolveWebviewEditor<T>(resource: UriComponents, handler: string, viewType: string, title: string, widgetOpenerOptions: T | undefined, options: theia.WebviewPanelOptions & theia.WebviewOptions, cancellation: CancellationToken): Promise<void>;
    getCustomDocumentEntry(viewType: string, resource: UriComponents): CustomDocumentStoreEntry;
    $disposeEdits(resourceComponents: UriComponents, viewType: string, editIds: number[]): void;
    $onMoveCustomEditor(handle: string, newResourceComponents: UriComponents, viewType: string): Promise<void>;
    $undo(resourceComponents: UriComponents, viewType: string, editId: number, isDirty: boolean): Promise<void>;
    $redo(resourceComponents: UriComponents, viewType: string, editId: number, isDirty: boolean): Promise<void>;
    $revert(resourceComponents: UriComponents, viewType: string, cancellation: CancellationToken): Promise<void>;
    $onSave(resourceComponents: UriComponents, viewType: string, cancellation: CancellationToken): Promise<void>;
    $onSaveAs(resourceComponents: UriComponents, viewType: string, targetResource: UriComponents, cancellation: CancellationToken): Promise<void>;
    private getCustomEditorProvider;
    private supportEditing;
}
declare class CustomDocumentStoreEntry {
    readonly document: theia.CustomDocument;
    constructor(document: theia.CustomDocument);
    private readonly edits;
    addEdit(item: theia.CustomDocumentEditEvent): number;
    undo(editId: number, isDirty: boolean): Promise<void>;
    redo(editId: number, isDirty: boolean): Promise<void>;
    disposeEdits(editIds: number[]): void;
    private getEdit;
}
export {};
//# sourceMappingURL=custom-editors.d.ts.map