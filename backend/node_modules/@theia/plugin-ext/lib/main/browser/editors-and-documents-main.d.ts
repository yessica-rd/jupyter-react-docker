import { interfaces } from '@theia/core/shared/inversify';
import * as monaco from '@theia/monaco-editor-core';
import { RPCProtocol } from '../../common/rpc-protocol';
import { Disposable } from '@theia/core/lib/common/disposable';
import { MonacoEditorModel } from '@theia/monaco/lib/browser/monaco-editor-model';
import { TextEditorMain } from './text-editor-main';
export declare class EditorsAndDocumentsMain implements Disposable {
    private readonly proxy;
    private readonly stateComputer;
    private readonly textEditors;
    private readonly modelService;
    private readonly editorService;
    private readonly onTextEditorAddEmitter;
    private readonly onTextEditorRemoveEmitter;
    private readonly onDocumentAddEmitter;
    private readonly onDocumentRemoveEmitter;
    readonly onTextEditorAdd: import("@theia/core").Event<TextEditorMain[]>;
    readonly onTextEditorRemove: import("@theia/core").Event<string[]>;
    readonly onDocumentAdd: import("@theia/core").Event<MonacoEditorModel[]>;
    readonly onDocumentRemove: import("@theia/core").Event<monaco.Uri[]>;
    private readonly toDispose;
    constructor(rpc: RPCProtocol, container: interfaces.Container);
    listen(): void;
    dispose(): void;
    private onDelta;
    private toModelAddData;
    private toTextEditorAddData;
    private findEditorPosition;
    getEditor(id: string): TextEditorMain | undefined;
    saveAll(includeUntitled?: boolean): Promise<boolean>;
    hideEditor(id: string): Promise<void>;
}
//# sourceMappingURL=editors-and-documents-main.d.ts.map