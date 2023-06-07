import { EditorManager } from './editor-manager';
import { TextEditor } from './editor';
import { StatusBar } from '@theia/core/lib/browser/status-bar/status-bar';
import { FrontendApplicationContribution, QuickInputService, KeybindingRegistry, KeybindingContribution, ApplicationShell } from '@theia/core/lib/browser';
import { ContextKeyService } from '@theia/core/lib/browser/context-key-service';
import { DisposableCollection, MenuContribution, MenuModelRegistry } from '@theia/core';
import { CommandRegistry, CommandContribution } from '@theia/core/lib/common';
import { EditorLanguageStatusService } from './language-status/editor-language-status-service';
export declare class EditorContribution implements FrontendApplicationContribution, CommandContribution, KeybindingContribution, MenuContribution {
    protected readonly statusBar: StatusBar;
    protected readonly editorManager: EditorManager;
    protected readonly languageStatusService: EditorLanguageStatusService;
    protected readonly shell: ApplicationShell;
    protected readonly contextKeyService: ContextKeyService;
    protected readonly quickInputService: QuickInputService;
    onStart(): void;
    protected initEditorContextKeys(): void;
    protected readonly toDisposeOnCurrentEditorChanged: DisposableCollection;
    protected updateStatusBar(): void;
    protected updateLanguageStatus(editor: TextEditor | undefined): void;
    protected updateEncodingStatus(editor: TextEditor | undefined): void;
    protected setCursorPositionStatus(editor: TextEditor | undefined): void;
    registerCommands(commands: CommandRegistry): void;
    registerKeybindings(keybindings: KeybindingRegistry): void;
    registerMenus(registry: MenuModelRegistry): void;
}
//# sourceMappingURL=editor-contribution.d.ts.map