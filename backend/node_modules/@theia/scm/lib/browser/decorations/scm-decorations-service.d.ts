import { ResourceProvider } from '@theia/core';
import { DirtyDiffDecorator } from '../dirty-diff/dirty-diff-decorator';
import { EditorManager, TextEditor } from '@theia/editor/lib/browser';
import { ScmService } from '../scm-service';
export declare class ScmDecorationsService {
    protected readonly decorator: DirtyDiffDecorator;
    protected readonly scmService: ScmService;
    protected readonly editorManager: EditorManager;
    protected readonly resourceProvider: ResourceProvider;
    private readonly diffComputer;
    private dirtyState;
    constructor(decorator: DirtyDiffDecorator, scmService: ScmService, editorManager: EditorManager, resourceProvider: ResourceProvider);
    applyEditorDecorations(editor: TextEditor): Promise<void>;
}
//# sourceMappingURL=scm-decorations-service.d.ts.map