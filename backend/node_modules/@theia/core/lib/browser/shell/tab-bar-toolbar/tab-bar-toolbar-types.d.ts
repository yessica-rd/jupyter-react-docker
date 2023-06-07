import * as React from 'react';
import { Event, MenuPath } from '../../../common';
import { Widget } from '../../widgets';
/** Items whose group is exactly 'navigation' will be rendered inline. */
export declare const NAVIGATION = "navigation";
export declare const TAB_BAR_TOOLBAR_CONTEXT_MENU: string[];
export interface TabBarDelegator extends Widget {
    getTabBarDelegate(): Widget | undefined;
}
export declare namespace TabBarDelegator {
    function is(candidate?: Widget): candidate is TabBarDelegator;
}
interface RegisteredToolbarItem {
    /**
     * The unique ID of the toolbar item.
     */
    id: string;
}
interface RenderedToolbarItem {
    /**
     * Optional icon for the item.
     */
    icon?: string | (() => string);
    /**
     * Optional text of the item.
     *
     * Strings in the format `$(iconIdentifier~animationType) will be treated as icon references.
     * If the iconIdentifier begins with fa-, Font Awesome icons will be used; otherwise it will be treated as Codicon name.
     *
     * You can find Codicon classnames here: https://microsoft.github.io/vscode-codicons/dist/codicon.html
     * You can find Font Awesome classnames here: http://fontawesome.io/icons/
     * The type of animation can be either `spin` or `pulse`.
     */
    text?: string;
    /**
     * Optional tooltip for the item.
     */
    tooltip?: string;
}
interface SelfRenderingToolbarItem {
    render(widget?: Widget): React.ReactNode;
}
interface ExecutableToolbarItem {
    /**
     * The command to execute when the item is selected.
     */
    command: string;
}
export interface MenuToolbarItem {
    /**
     * A menu path with which this item is associated.
     * If accompanied by a command, this data will be passed to the {@link MenuCommandExecutor}.
     * If no command is present, this menu will be opened.
     */
    menuPath: MenuPath;
}
interface ConditionalToolbarItem {
    /**
     * https://code.visualstudio.com/docs/getstarted/keybindings#_when-clause-contexts
     */
    when?: string;
    /**
     * Checked before the item is shown.
     */
    isVisible?(widget?: Widget): boolean;
    /**
     * When defined, the container tool-bar will be updated if this event is fired.
     *
     * Note: currently, each item of the container toolbar will be re-rendered if any of the items have changed.
     */
    onDidChange?: Event<void>;
}
interface InlineToolbarItemMetadata {
    /**
     * Priority among the items. Can be negative. The smaller the number the left-most the item will be placed in the toolbar. It is `0` by default.
     */
    priority?: number;
    group: 'navigation' | undefined;
}
interface MenuToolbarItemMetadata {
    /**
     * Optional group for the item. Default `navigation`.
     * `navigation` group will be inlined, while all the others will appear in the `...` dropdown.
     * A group in format `submenu_group_1/submenu 1/.../submenu_group_n/ submenu n/item_group` means that the item will be located in a submenu(s) of the `...` dropdown.
     * The submenu's title is named by the submenu section name, e.g. `group/<submenu name>/subgroup`.
     */
    group: string;
    /**
     * Optional ordering string for placing the item within its group
     */
    order?: string;
}
/**
 * Representation of an item in the tab
 */
export interface TabBarToolbarItem extends RegisteredToolbarItem, ExecutableToolbarItem, RenderedToolbarItem, Omit<ConditionalToolbarItem, 'isVisible'>, Pick<InlineToolbarItemMetadata, 'priority'>, Partial<MenuToolbarItemMetadata> {
}
/**
 * Tab-bar toolbar item backed by a `React.ReactNode`.
 * Unlike the `TabBarToolbarItem`, this item is not connected to the command service.
 */
export interface ReactTabBarToolbarItem extends RegisteredToolbarItem, SelfRenderingToolbarItem, ConditionalToolbarItem, Pick<InlineToolbarItemMetadata, 'priority'>, Pick<Partial<MenuToolbarItemMetadata>, 'group'> {
}
export interface AnyToolbarItem extends RegisteredToolbarItem, Partial<ExecutableToolbarItem>, Partial<RenderedToolbarItem>, Partial<SelfRenderingToolbarItem>, Partial<ConditionalToolbarItem>, Partial<MenuToolbarItem>, Pick<InlineToolbarItemMetadata, 'priority'>, Partial<MenuToolbarItemMetadata> {
}
export interface MenuDelegate extends MenuToolbarItem, Required<Pick<ConditionalToolbarItem, 'isVisible'>> {
}
export declare namespace TabBarToolbarItem {
    /**
     * Compares the items by `priority` in ascending. Undefined priorities will be treated as `0`.
     */
    const PRIORITY_COMPARATOR: (left: TabBarToolbarItem, right: TabBarToolbarItem) => number;
    function is(arg: unknown): arg is TabBarToolbarItem;
}
export declare namespace MenuToolbarItem {
    function getMenuPath(item: AnyToolbarItem): MenuPath | undefined;
}
export {};
//# sourceMappingURL=tab-bar-toolbar-types.d.ts.map