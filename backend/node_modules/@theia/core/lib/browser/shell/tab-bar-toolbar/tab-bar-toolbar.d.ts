import * as React from 'react';
import { ContextKeyService } from '../../context-key-service';
import { CommandRegistry, Disposable, DisposableCollection, MenuCommandExecutor, MenuModelRegistry, MenuPath } from '../../../common';
import { Anchor, ContextMenuAccess, ContextMenuRenderer } from '../../context-menu-renderer';
import { LabelParser } from '../../label-parser';
import { ReactWidget, Widget } from '../../widgets';
import { TabBarToolbarRegistry } from './tab-bar-toolbar-registry';
import { AnyToolbarItem, ReactTabBarToolbarItem, TabBarToolbarItem } from './tab-bar-toolbar-types';
/**
 * Factory for instantiating tab-bar toolbars.
 */
export declare const TabBarToolbarFactory: unique symbol;
export interface TabBarToolbarFactory {
    (): TabBarToolbar;
}
/**
 * Tab-bar toolbar widget representing the active [tab-bar toolbar items](TabBarToolbarItem).
 */
export declare class TabBarToolbar extends ReactWidget {
    protected current: Widget | undefined;
    protected inline: Map<string, TabBarToolbarItem | ReactTabBarToolbarItem>;
    protected more: Map<string, TabBarToolbarItem>;
    protected contextKeyListener: Disposable | undefined;
    protected toDisposeOnUpdateItems: DisposableCollection;
    protected readonly commands: CommandRegistry;
    protected readonly labelParser: LabelParser;
    protected readonly menus: MenuModelRegistry;
    protected readonly menuCommandExecutor: MenuCommandExecutor;
    protected readonly contextMenuRenderer: ContextMenuRenderer;
    protected readonly toolbarRegistry: TabBarToolbarRegistry;
    protected readonly contextKeyService: ContextKeyService;
    constructor();
    updateItems(items: Array<TabBarToolbarItem | ReactTabBarToolbarItem>, current: Widget | undefined): void;
    updateTarget(current?: Widget): void;
    protected readonly toDisposeOnSetCurrent: DisposableCollection;
    protected setCurrent(current: Widget | undefined): void;
    protected updateContextKeyListener(contextKeys: Set<string>): void;
    protected render(): React.ReactNode;
    protected renderItem(item: AnyToolbarItem): React.ReactNode;
    protected isEnabled(item: AnyToolbarItem): boolean;
    protected getToolbarItemClassNames(item: AnyToolbarItem): string[];
    protected renderMore(): React.ReactNode;
    protected showMoreContextMenu: (event: React.MouseEvent) => void;
    protected toAnchor(event: React.MouseEvent): Anchor;
    renderMoreContextMenu(anchor: Anchor, subpath?: MenuPath): ContextMenuAccess;
    shouldHandleMouseEvent(event: MouseEvent): boolean;
    protected commandIsEnabled(command: string): boolean;
    protected commandIsToggled(command: string): boolean;
    protected evaluateWhenClause(whenClause: string | undefined): boolean;
    protected executeCommand: (e: React.MouseEvent<HTMLElement>) => void;
    protected onMouseDownEvent: (e: React.MouseEvent<HTMLElement>) => void;
    protected onMouseUpEvent: (e: React.MouseEvent<HTMLElement>) => void;
}
export declare namespace TabBarToolbar {
    namespace Styles {
        const TAB_BAR_TOOLBAR = "p-TabBar-toolbar";
        const TAB_BAR_TOOLBAR_ITEM = "item";
    }
}
//# sourceMappingURL=tab-bar-toolbar.d.ts.map