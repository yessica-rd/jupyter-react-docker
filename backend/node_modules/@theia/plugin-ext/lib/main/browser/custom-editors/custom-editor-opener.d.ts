import URI from '@theia/core/lib/common/uri';
import { ApplicationShell, OpenHandler, Widget, WidgetManager, WidgetOpenerOptions } from '@theia/core/lib/browser';
import { CustomEditor, CustomEditorSelector } from '../../../common';
import { CustomEditorWidget } from './custom-editor-widget';
export declare class CustomEditorOpener implements OpenHandler {
    private readonly editor;
    protected readonly shell: ApplicationShell;
    protected readonly widgetManager: WidgetManager;
    readonly id: string;
    readonly label: string;
    private readonly onDidOpenCustomEditorEmitter;
    readonly onDidOpenCustomEditor: import("@theia/core").Event<[CustomEditorWidget, (WidgetOpenerOptions | undefined)?]>;
    constructor(editor: CustomEditor, shell: ApplicationShell, widgetManager: WidgetManager);
    static toCustomEditorId(editorViewType: string): string;
    canHandle(uri: URI): number;
    getPriority(): number;
    protected readonly pendingWidgetPromises: Map<string, Promise<CustomEditorWidget>>;
    open(uri: URI, options?: WidgetOpenerOptions): Promise<Widget | undefined>;
    matches(selectors: CustomEditorSelector[], resource: URI): boolean;
    selectorMatches(selector: CustomEditorSelector, resource: URI): boolean;
}
//# sourceMappingURL=custom-editor-opener.d.ts.map