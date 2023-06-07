import { TextEditorConfiguration, TextEditorsMain } from '../common/plugin-api-rpc';
import { Selection, Range, TextEditorLineNumbersStyle, SnippetString, Position, EndOfLine } from './types-impl';
import * as theia from '@theia/plugin';
import { DocumentDataExt } from './document-data';
import { TextEditorCursorStyle } from '../common/editor-options';
export declare class TextEditorExt implements theia.TextEditor {
    private readonly proxy;
    private readonly id;
    private _selections;
    private _visibleRanges;
    private _viewColumn;
    private _document;
    private _options;
    private disposed;
    constructor(proxy: TextEditorsMain, id: string, document: DocumentDataExt, _selections: Selection[], options: TextEditorConfiguration, _visibleRanges: Range[], viewColumn: theia.ViewColumn | undefined);
    get document(): theia.TextDocument;
    set document(doc: theia.TextDocument);
    acceptViewColumn(val: theia.ViewColumn): void;
    dispose(): void;
    get options(): theia.TextEditorOptions;
    set options(val: theia.TextEditorOptions);
    acceptOptions(options: TextEditorConfiguration): void;
    get selection(): Selection;
    set selection(val: Selection);
    private trySetSelection;
    get selections(): Selection[];
    set selections(val: Selection[]);
    acceptSelections(selections: Selection[]): void;
    get visibleRanges(): Range[];
    set visibleRanges(val: Range[]);
    acceptVisibleRanges(range: Range[]): void;
    get viewColumn(): theia.ViewColumn | undefined;
    set viewColumn(value: theia.ViewColumn | undefined);
    _acceptViewColumn(value: theia.ViewColumn): void;
    edit(callback: (editBuilder: theia.TextEditorEdit) => void, options?: {
        undoStopBefore: boolean;
        undoStopAfter: boolean;
    }): Promise<boolean>;
    insertSnippet(snippet: SnippetString, location?: Position | Range | Position[] | Range[], options?: {
        undoStopBefore: boolean;
        undoStopAfter: boolean;
    }): Promise<boolean>;
    setDecorations(decorationType: theia.TextEditorDecorationType, rangesOrOptions: Range[] | theia.DecorationOptions[]): void;
    revealRange(range: Range, revealType?: theia.TextEditorRevealType): void;
    private applyEdit;
    private runOnProxy;
    show(column?: theia.ViewColumn): void;
    hide(): void;
}
export declare class TextEditorOptionsExt implements theia.TextEditorOptions {
    private readonly proxy;
    private readonly id;
    private _tabSize?;
    private _insertSpace;
    private _cursorStyle;
    private _lineNumbers;
    constructor(proxy: TextEditorsMain, id: string, source: TextEditorConfiguration);
    accept(source: TextEditorConfiguration): void;
    get tabSize(): number | string | undefined;
    set tabSize(val: number | string | undefined);
    private validateTabSize;
    get insertSpaces(): boolean | string;
    set insertSpaces(val: boolean | string);
    private validateInsertSpaces;
    get cursorStyle(): TextEditorCursorStyle;
    set cursorStyle(val: TextEditorCursorStyle);
    get lineNumbers(): TextEditorLineNumbersStyle;
    set lineNumbers(val: TextEditorLineNumbersStyle);
    assign(newOptions: theia.TextEditorOptions): void;
}
export interface TextEditOperation {
    range: theia.Range;
    text?: string;
    forceMoveMarkers: boolean;
}
export interface EditData {
    documentVersionId: number;
    edits: TextEditOperation[];
    setEndOfLine: EndOfLine;
    undoStopBefore: boolean;
    undoStopAfter: boolean;
}
export declare class TextEditorEdit {
    private document;
    private readonly documentVersionId;
    private collectedEdits;
    private eol;
    private readonly undoStopBefore;
    private readonly undoStopAfter;
    constructor(document: theia.TextDocument, options: {
        undoStopBefore: boolean;
        undoStopAfter: boolean;
    });
    finalize(): EditData;
    replace(location: Position | Range | Selection, val: string): void;
    insert(location: Position, val: string): void;
    delete(location: Range | Selection): void;
    setEndOfLine(endOfLine: EndOfLine): void;
    private addEdit;
}
//# sourceMappingURL=text-editor.d.ts.map