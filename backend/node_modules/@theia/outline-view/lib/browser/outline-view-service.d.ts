import { Event, Emitter } from '@theia/core';
import { WidgetFactory } from '@theia/core/lib/browser';
import { OutlineViewWidget, OutlineViewWidgetFactory, OutlineSymbolInformationNode } from './outline-view-widget';
import { Widget } from '@theia/core/shared/@phosphor/widgets';
export declare class OutlineViewService implements WidgetFactory {
    protected factory: OutlineViewWidgetFactory;
    id: string;
    protected widget?: OutlineViewWidget;
    protected readonly onDidChangeOutlineEmitter: Emitter<OutlineSymbolInformationNode[]>;
    protected readonly onDidChangeOpenStateEmitter: Emitter<boolean>;
    protected readonly onDidSelectEmitter: Emitter<OutlineSymbolInformationNode>;
    protected readonly onDidOpenEmitter: Emitter<OutlineSymbolInformationNode>;
    constructor(factory: OutlineViewWidgetFactory);
    get onDidSelect(): Event<OutlineSymbolInformationNode>;
    get onDidOpen(): Event<OutlineSymbolInformationNode>;
    get onDidChangeOutline(): Event<OutlineSymbolInformationNode[]>;
    get onDidChangeOpenState(): Event<boolean>;
    get open(): boolean;
    /**
     * Publish the collection of outline view symbols.
     * - Publishing includes setting the `OutlineViewWidget` tree with symbol information.
     * @param roots the list of outline symbol information nodes.
     */
    publish(roots: OutlineSymbolInformationNode[]): void;
    createWidget(): Promise<Widget>;
}
//# sourceMappingURL=outline-view-service.d.ts.map