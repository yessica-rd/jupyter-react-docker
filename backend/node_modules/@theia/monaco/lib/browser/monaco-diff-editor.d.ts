import URI from '@theia/core/lib/common/uri';
import { Disposable } from '@theia/core/lib/common';
import { Dimension, DiffNavigator, DeltaDecorationParams } from '@theia/editor/lib/browser';
import { MonacoEditorModel } from './monaco-editor-model';
import { EditorServiceOverrides, MonacoEditor, MonacoEditorServices } from './monaco-editor';
import { MonacoDiffNavigatorFactory } from './monaco-diff-navigator-factory';
import * as monaco from '@theia/monaco-editor-core';
import { IDiffEditorConstructionOptions } from '@theia/monaco-editor-core/esm/vs/editor/browser/editorBrowser';
import { IDiffNavigatorOptions } from '@theia/monaco-editor-core/esm/vs/editor/standalone/browser/standaloneEditor';
export declare namespace MonacoDiffEditor {
    interface IOptions extends MonacoEditor.ICommonOptions, IDiffEditorConstructionOptions, IDiffNavigatorOptions {
    }
}
export declare class MonacoDiffEditor extends MonacoEditor {
    readonly originalModel: MonacoEditorModel;
    readonly modifiedModel: MonacoEditorModel;
    protected readonly diffNavigatorFactory: MonacoDiffNavigatorFactory;
    protected _diffEditor: monaco.editor.IStandaloneDiffEditor;
    protected _diffNavigator: DiffNavigator;
    constructor(uri: URI, node: HTMLElement, originalModel: MonacoEditorModel, modifiedModel: MonacoEditorModel, services: MonacoEditorServices, diffNavigatorFactory: MonacoDiffNavigatorFactory, options?: MonacoDiffEditor.IOptions, override?: EditorServiceOverrides);
    get diffEditor(): monaco.editor.IStandaloneDiffEditor;
    get diffNavigator(): DiffNavigator;
    protected create(options?: IDiffEditorConstructionOptions, override?: EditorServiceOverrides): Disposable;
    protected resize(dimension: Dimension | null): void;
    isActionSupported(id: string): boolean;
    deltaDecorations(params: DeltaDecorationParams): string[];
    getResourceUri(): URI;
    createMoveToUri(resourceUri: URI): URI;
}
//# sourceMappingURL=monaco-diff-editor.d.ts.map