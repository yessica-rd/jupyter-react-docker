export interface Language {
    readonly id: string;
    readonly name: string;
    readonly extensions: Set<string>;
    readonly filenames: Set<string>;
}
export declare class LanguageService {
    /**
     * It should be implemented by an extension, e.g. by the monaco extension.
     */
    get languages(): Language[];
    /**
     * It should be implemented by an extension, e.g. by the monaco extension.
     */
    getLanguage(languageId: string): Language | undefined;
}
//# sourceMappingURL=language-service.d.ts.map