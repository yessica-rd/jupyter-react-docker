import { MarkdownString as MarkdownStringInterface } from '@theia/core/lib/common/markdown-rendering';
import * as pluginAPI from '@theia/plugin';
export declare class MarkdownString implements pluginAPI.MarkdownString {
    #private;
    /**
     * @returns whether the thing is a markdown string implementation with helper methods.
     */
    static isMarkdownString(thing: any): thing is pluginAPI.MarkdownString;
    constructor(value?: string, supportThemeIcons?: boolean);
    get value(): string;
    set value(value: string);
    get isTrusted(): boolean | undefined;
    set isTrusted(value: boolean | undefined);
    get supportThemeIcons(): boolean | undefined;
    set supportThemeIcons(value: boolean | undefined);
    get supportHtml(): boolean | undefined;
    set supportHtml(value: boolean | undefined);
    get baseUri(): pluginAPI.Uri | undefined;
    set baseUri(value: pluginAPI.Uri | undefined);
    appendText(value: string): pluginAPI.MarkdownString;
    appendMarkdown(value: string): pluginAPI.MarkdownString;
    appendCodeblock(value: string, language?: string): pluginAPI.MarkdownString;
    toJSON(): MarkdownStringInterface;
}
//# sourceMappingURL=markdown-string.d.ts.map