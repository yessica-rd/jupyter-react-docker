import { Command, CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, SelectionService } from '@theia/core';
import { KeybindingContribution, KeybindingRegistry } from '@theia/core/lib/browser';
import { WidgetManager } from '@theia/core/lib/browser/widget-manager';
import { FileStatNode } from '@theia/filesystem/lib/browser';
import { FileNavigatorWidget } from '../browser';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import '@theia/core/lib/electron-common/electron-api';
export declare const OPEN_CONTAINING_FOLDER: Command;
export declare class ElectronNavigatorMenuContribution implements MenuContribution, CommandContribution, KeybindingContribution {
    protected readonly selectionService: SelectionService;
    protected readonly widgetManager: WidgetManager;
    protected readonly workspaceService: WorkspaceService;
    registerCommands(commands: CommandRegistry): void;
    registerMenus(menus: MenuModelRegistry): void;
    registerKeybindings(keybindings: KeybindingRegistry): void;
    protected getSelectedFileStatNodes(): FileStatNode[];
    tryGetNavigatorWidget(): FileNavigatorWidget | undefined;
}
//# sourceMappingURL=electron-navigator-menu-contribution.d.ts.map