import { LanguageInfo, Localization } from '../../common/i18n/localization';
export declare class LocalizationProvider {
    protected localizations: Localization[];
    protected currentLanguage: string;
    addLocalizations(...localizations: Localization[]): void;
    removeLocalizations(...localizations: Localization[]): void;
    setCurrentLanguage(languageId: string): void;
    getCurrentLanguage(): string;
    getAvailableLanguages(all?: boolean): LanguageInfo[];
    loadLocalization(languageId: string): Localization;
}
//# sourceMappingURL=localization-provider.d.ts.map