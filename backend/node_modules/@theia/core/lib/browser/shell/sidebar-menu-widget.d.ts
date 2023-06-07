import * as React from 'react';
import { ReactWidget } from '../widgets';
import { ContextMenuRenderer } from '../context-menu-renderer';
import { MenuPath } from '../../common/menu';
import { HoverService } from '../hover-service';
export declare const SidebarTopMenuWidgetFactory: unique symbol;
export declare const SidebarBottomMenuWidgetFactory: unique symbol;
export interface SidebarMenu {
    id: string;
    iconClass: string;
    title: string;
    menuPath: MenuPath;
    order: number;
}
/**
 * The menu widget placed on the sidebar.
 */
export declare class SidebarMenuWidget extends ReactWidget {
    protected readonly menus: SidebarMenu[];
    /**
     * The element that had focus when a menu rendered by this widget was activated.
     */
    protected preservedContext: HTMLElement | undefined;
    /**
     * Flag indicating whether a context menu is open. While a context menu is open, the `preservedContext` should not be cleared.
     */
    protected preservingContext: boolean;
    protected readonly contextMenuRenderer: ContextMenuRenderer;
    protected readonly hoverService: HoverService;
    constructor();
    addMenu(menu: SidebarMenu): void;
    removeMenu(menuId: string): void;
    protected readonly onMouseDown: () => void;
    protected readonly onMouseOut: () => void;
    protected readonly onMouseEnter: (event: React.MouseEvent<HTMLElement, MouseEvent>, title: string) => void;
    protected onClick(e: React.MouseEvent<HTMLElement, MouseEvent>, menuPath: MenuPath): void;
    protected render(): React.ReactNode;
}
//# sourceMappingURL=sidebar-menu-widget.d.ts.map