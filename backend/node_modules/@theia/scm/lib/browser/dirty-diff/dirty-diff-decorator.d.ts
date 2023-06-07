import { EditorDecoration, EditorDecorationOptions, EditorDecorator, TextEditor } from '@theia/editor/lib/browser';
import { DirtyDiff, LineRange } from './diff-computer';
export declare enum DirtyDiffDecorationType {
    AddedLine = "dirty-diff-added-line",
    RemovedLine = "dirty-diff-removed-line",
    ModifiedLine = "dirty-diff-modified-line"
}
export interface DirtyDiffUpdate extends DirtyDiff {
    readonly editor: TextEditor;
}
export declare class DirtyDiffDecorator extends EditorDecorator {
    applyDecorations(update: DirtyDiffUpdate): void;
    protected toDeltaDecoration(from: LineRange | number, options: EditorDecorationOptions): EditorDecoration;
}
//# sourceMappingURL=dirty-diff-decorator.d.ts.map