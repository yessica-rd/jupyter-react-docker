import { DisposableCollection } from '@theia/core';
import { FrontendApplicationContribution, FrontendApplication, StatusBar } from '@theia/core/lib/browser';
import { EditorManager, EditorWidget } from '@theia/editor/lib/browser';
import * as monaco from '@theia/monaco-editor-core';
export declare class MonacoStatusBarContribution implements FrontendApplicationContribution {
    protected readonly editorManager: EditorManager;
    protected readonly statusBar: StatusBar;
    protected readonly toDispose: DisposableCollection;
    constructor(editorManager: EditorManager, statusBar: StatusBar);
    onStart(app: FrontendApplication): void;
    protected updateStatusBar(): void;
    protected setConfigTabSizeWidget(): void;
    protected removeConfigTabSizeWidget(): void;
    protected setLineEndingWidget(): void;
    protected removeLineEndingWidget(): void;
    protected getModel(editor: EditorWidget | undefined): monaco.editor.ITextModel | undefined;
}
//# sourceMappingURL=monaco-status-bar-contribution.d.ts.map