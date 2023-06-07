export declare type ThemeType = 'light' | 'dark' | 'hc' | 'hcLight';
export interface Theme {
    readonly id: string;
    readonly type: ThemeType;
    readonly label: string;
    readonly description?: string;
    readonly editorTheme?: string;
    activate?(): void;
    deactivate?(): void;
}
export declare function isHighContrast(scheme: ThemeType): boolean;
export interface ThemeChangeEvent {
    readonly newTheme: Theme;
    readonly oldTheme?: Theme;
}
//# sourceMappingURL=theme.d.ts.map