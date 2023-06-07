import * as theia from '@theia/plugin';
import { ModelChangedEvent, DocumentsMain } from '../common/plugin-api-rpc';
import { URI } from './types-impl';
export declare function setWordDefinitionFor(modeId: string, wordDefinition: RegExp | null): void;
export declare function getWordDefinitionFor(modeId: string): RegExp;
export declare class DocumentDataExt {
    private proxy;
    private uri;
    private lines;
    private eol;
    private languageId;
    private versionId;
    private disposed;
    private dirty;
    private _document;
    private textLines;
    private lineStarts;
    constructor(proxy: DocumentsMain, uri: URI, lines: string[], eol: string, languageId: string, versionId: number, isDirty: boolean);
    dispose(): void;
    onEvents(e: ModelChangedEvent): void;
    acceptIsDirty(isDirty: boolean): void;
    acceptLanguageId(langId: string): void;
    get document(): theia.TextDocument;
    private acceptInsertText;
    private acceptDeleteRange;
    private setLineText;
    private save;
    private getTextInRange;
    private validateRange;
    private getText;
    private validatePosition;
    private lineAt;
    private offsetAt;
    private ensureLineStarts;
    private positionAt;
    private getWordRangeAtPosition;
}
export declare function regExpLeadsToEndlessLoop(regexp: RegExp): boolean;
//# sourceMappingURL=document-data.d.ts.map