import * as theia from '@theia/plugin';
import { ThemeColor, StatusBarAlignment } from '../types-impl';
import { StatusBarMessageRegistryMain } from '../../common/plugin-api-rpc';
export declare class StatusBarItemImpl implements theia.StatusBarItem {
    /** Map from allowed background colors to corresponding foreground colors. */
    private static BACKGROUND_COLORS;
    private _id;
    private _alignment;
    private _priority;
    private _name;
    private _text;
    private _tooltip;
    private _color;
    private _backgroundColor;
    private _command;
    private _accessibilityInformation;
    private _isVisible;
    private _timeoutHandle;
    _proxy: StatusBarMessageRegistryMain;
    constructor(_proxy: StatusBarMessageRegistryMain, alignment?: StatusBarAlignment, priority?: number, id?: string);
    get id(): string;
    get alignment(): theia.StatusBarAlignment;
    get priority(): number;
    get name(): string | undefined;
    get text(): string;
    get tooltip(): string | theia.MarkdownString | undefined;
    get color(): string | ThemeColor | undefined;
    get backgroundColor(): ThemeColor | undefined;
    get command(): string | theia.Command;
    get accessibilityInformation(): theia.AccessibilityInformation;
    set name(name: string | undefined);
    set text(text: string);
    set tooltip(tooltip: string | theia.MarkdownString | undefined);
    set color(color: string | ThemeColor | undefined);
    set backgroundColor(backgroundColor: ThemeColor | undefined);
    set command(command: string | theia.Command);
    set accessibilityInformation(information: theia.AccessibilityInformation);
    show(): void;
    hide(): void;
    private update;
    dispose(): void;
    static nextId(): string;
    static ID_PREFIX: string;
}
//# sourceMappingURL=status-bar-item.d.ts.map