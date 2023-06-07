import { CustomEditor } from '../../../common';
import { Disposable } from '@theia/core/lib/common/disposable';
import { CommandRegistry, MenuModelRegistry } from '@theia/core';
import { SelectionService } from '@theia/core/lib/common';
import { ApplicationShell, DefaultOpenerService, WidgetManager, WidgetOpenerOptions } from '@theia/core/lib/browser';
import { CustomEditorWidget } from './custom-editor-widget';
export declare class PluginCustomEditorRegistry {
    private readonly editors;
    private readonly pendingEditors;
    private readonly resolvers;
    private readonly onWillOpenCustomEditorEmitter;
    readonly onWillOpenCustomEditor: import("@theia/core").Event<string>;
    protected readonly defaultOpenerService: DefaultOpenerService;
    protected readonly menuModelRegistry: MenuModelRegistry;
    protected readonly commandRegistry: CommandRegistry;
    protected readonly selectionService: SelectionService;
    protected readonly widgetManager: WidgetManager;
    protected readonly shell: ApplicationShell;
    protected init(): void;
    registerCustomEditor(editor: CustomEditor): Disposable;
    resolveWidget: (widget: CustomEditorWidget, options?: WidgetOpenerOptions | undefined) => void;
    registerResolver(viewType: string, resolver: (widget: CustomEditorWidget, options?: WidgetOpenerOptions) => void): Disposable;
}
//# sourceMappingURL=plugin-custom-editor-registry.d.ts.map