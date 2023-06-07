import * as monaco from '@theia/monaco-editor-core';
import { Disposable, DisposableCollection } from '@theia/core/lib/common/disposable';
import { MonacoEditor } from '@theia/monaco/lib/browser/monaco-editor';
import { TextEditorConfiguration, EditorChangedPropertiesData, Selection, TextEditorConfigurationUpdate, TextEditorRevealType, SingleEditOperation, ApplyEditsOptions, UndoStopOptions, DecorationOptions } from '../../common/plugin-api-rpc';
import { Range } from '../../common/plugin-api-rpc-model';
import { Event } from '@theia/core';
export declare class TextEditorMain implements Disposable {
    private id;
    private model;
    private properties;
    private editor;
    private readonly onPropertiesChangedEmitter;
    private readonly toDispose;
    constructor(id: string, model: monaco.editor.IModel, editor: MonacoEditor);
    dispose(): void;
    private updateProperties;
    private setProperties;
    protected readonly toDisposeOnEditor: DisposableCollection;
    private setEditor;
    getId(): string;
    getModel(): monaco.editor.IModel;
    getProperties(): TextEditorPropertiesMain | undefined;
    get onPropertiesChangedEvent(): Event<EditorChangedPropertiesData>;
    setSelections(selections: Selection[]): void;
    setConfiguration(newConfiguration: TextEditorConfigurationUpdate): void;
    private setIndentConfiguration;
    revealRange(range: monaco.Range, revealType: TextEditorRevealType): void;
    applyEdits(versionId: number, edits: SingleEditOperation[], opts: ApplyEditsOptions): boolean;
    insertSnippet(template: string, ranges: Range[], opts: UndoStopOptions): boolean;
    setDecorations(key: string, ranges: DecorationOptions[]): void;
    setDecorationsFast(key: string, _ranges: number[]): void;
    private static toMonacoSelections;
}
export declare class TextEditorPropertiesMain {
    readonly selections: monaco.Selection[];
    readonly options: TextEditorConfiguration;
    readonly visibleRanges: monaco.Range[];
    constructor(selections: monaco.Selection[], options: TextEditorConfiguration, visibleRanges: monaco.Range[]);
    generateDelta(old: TextEditorPropertiesMain | undefined, source: string | undefined): EditorChangedPropertiesData | undefined;
    static readFromEditor(prevProperties: TextEditorPropertiesMain | undefined, model: monaco.editor.IModel, editor: MonacoEditor): TextEditorPropertiesMain;
    private static getSelectionsFromEditor;
    private static getOptionsFromEditor;
    private static getVisibleRangesFromEditor;
    private static selectionsEqual;
    private static optionsEqual;
    private static rangesEqual;
}
//# sourceMappingURL=text-editor-main.d.ts.map