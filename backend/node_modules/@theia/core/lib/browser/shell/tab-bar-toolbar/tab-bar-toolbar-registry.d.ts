/// <reference types="lodash" />
import { CommandRegistry, ContributionProvider, Disposable, Emitter, Event, MenuModelRegistry, MenuPath } from '../../../common';
import { ContextKeyService } from '../../context-key-service';
import { FrontendApplicationContribution } from '../../frontend-application';
import { Widget } from '../../widgets';
import { MenuDelegate, ReactTabBarToolbarItem, TabBarToolbarItem } from './tab-bar-toolbar-types';
/**
 * Clients should implement this interface if they want to contribute to the tab-bar toolbar.
 */
export declare const TabBarToolbarContribution: unique symbol;
/**
 * Representation of a tabbar toolbar contribution.
 */
export interface TabBarToolbarContribution {
    /**
     * Registers toolbar items.
     * @param registry the tabbar toolbar registry.
     */
    registerToolbarItems(registry: TabBarToolbarRegistry): void;
}
/**
 * Main, shared registry for tab-bar toolbar items.
 */
export declare class TabBarToolbarRegistry implements FrontendApplicationContribution {
    protected items: Map<string, TabBarToolbarItem | ReactTabBarToolbarItem>;
    protected menuDelegates: Map<string, MenuDelegate>;
    protected readonly commandRegistry: CommandRegistry;
    protected readonly contextKeyService: ContextKeyService;
    protected readonly menuRegistry: MenuModelRegistry;
    protected readonly contributionProvider: ContributionProvider<TabBarToolbarContribution>;
    protected readonly onDidChangeEmitter: Emitter<void>;
    readonly onDidChange: Event<void>;
    protected fireOnDidChange: import("lodash").DebouncedFunc<() => any>;
    onStart(): void;
    /**
     * Registers the given item. Throws an error, if the corresponding command cannot be found or an item has been already registered for the desired command.
     *
     * @param item the item to register.
     */
    registerItem(item: TabBarToolbarItem | ReactTabBarToolbarItem): Disposable;
    /**
     * Returns an array of tab-bar toolbar items which are visible when the `widget` argument is the current one.
     *
     * By default returns with all items where the command is enabled and `item.isVisible` is `true`.
     */
    visibleItems(widget: Widget): Array<TabBarToolbarItem | ReactTabBarToolbarItem>;
    unregisterItem(itemOrId: TabBarToolbarItem | ReactTabBarToolbarItem | string): void;
    registerMenuDelegate(menuPath: MenuPath, when?: string | ((widget: Widget) => boolean)): Disposable;
    unregisterMenuDelegate(menuPath: MenuPath): void;
}
//# sourceMappingURL=tab-bar-toolbar-registry.d.ts.map