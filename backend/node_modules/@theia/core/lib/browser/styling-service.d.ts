import { ContributionProvider } from '../common/contribution-provider';
import { Theme, ThemeType } from '../common/theme';
import { ColorRegistry } from './color-registry';
import { FrontendApplicationContribution } from './frontend-application';
import { ThemeService } from './theming';
export declare const StylingParticipant: unique symbol;
export interface StylingParticipant {
    registerThemeStyle(theme: ColorTheme, collector: CssStyleCollector): void;
}
export interface ColorTheme {
    type: ThemeType;
    label: string;
    getColor(color: string): string | undefined;
}
export interface CssStyleCollector {
    addRule(rule: string): void;
}
export declare class StylingService implements FrontendApplicationContribution {
    protected cssElement: HTMLStyleElement;
    protected readonly themeService: ThemeService;
    protected readonly colorRegistry: ColorRegistry;
    protected readonly themingParticipants: ContributionProvider<StylingParticipant>;
    onStart(): void;
    protected applyStyling(theme: Theme): void;
}
//# sourceMappingURL=styling-service.d.ts.map