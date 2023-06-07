/// <reference types="lodash" />
import { Title, Widget } from '@phosphor/widgets';
import { Event, Emitter, ContributionProvider } from '../../common';
import { WidgetDecoration } from '../widget-decoration';
import { FrontendApplicationContribution } from '../frontend-application';
export declare const TabBarDecorator: unique symbol;
export interface TabBarDecorator {
    /**
     * The unique identifier of the tab bar decorator.
     */
    readonly id: string;
    /**
     * Event that is fired when any of the available tab bar decorators has changes.
     */
    readonly onDidChangeDecorations: Event<void>;
    /**
     * Decorate title.
     * @param {Title<Widget>} title the title
     * @returns decoration data.
     */
    decorate(title: Title<Widget>): WidgetDecoration.Data[];
}
export declare class TabBarDecoratorService implements FrontendApplicationContribution {
    protected readonly onDidChangeDecorationsEmitter: Emitter<void>;
    readonly onDidChangeDecorations: Event<void>;
    protected readonly contributions: ContributionProvider<TabBarDecorator>;
    initialize(): void;
    fireDidChangeDecorations: import("lodash").DebouncedFunc<() => any>;
    /**
     * Assign tabs the decorators provided by all the contributions.
     * @param {Title<Widget>} title the title
     * @returns an array of its decoration data.
     */
    getDecorations(title: Title<Widget>): WidgetDecoration.Data[];
}
//# sourceMappingURL=tab-bar-decorator.d.ts.map