import { DiffNavigator } from '@theia/editor/lib/browser';
import * as monaco from '@theia/monaco-editor-core';
import { IStandaloneDiffEditor } from '@theia/monaco-editor-core/esm/vs/editor/standalone/browser/standaloneCodeEditor';
export declare class MonacoDiffNavigatorFactory {
    static nullNavigator: DiffNavigator;
    createdDiffNavigator(editor: IStandaloneDiffEditor | monaco.editor.IStandaloneDiffEditor, options?: monaco.editor.IDiffNavigatorOptions): DiffNavigator;
}
//# sourceMappingURL=monaco-diff-navigator-factory.d.ts.map