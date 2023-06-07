import { Disposable, DisposableCollection } from '@theia/core/lib/common/disposable';
import { ThemeService } from '@theia/core/lib/browser/theming';
import { Theme } from '@theia/core/lib/common/theme';
import { IconUrl } from '../../common/plugin-protocol';
import { Reference } from '@theia/core/lib/common/reference';
export interface PluginIconKey {
    url: IconUrl;
    size: number;
}
export interface PluginIcon extends Disposable {
    readonly iconClass: string;
}
export declare class PluginSharedStyle {
    protected readonly themeService: ThemeService;
    protected style: HTMLStyleElement;
    protected readonly rules: {
        selector: string;
        body: (theme: Theme) => string;
    }[];
    protected init(): void;
    protected readonly toUpdate: DisposableCollection;
    protected update(): void;
    insertRule(selector: string, body: (theme: Theme) => string): Disposable;
    protected doInsertRule({ selector, body }: {
        selector: string;
        body: (theme: Theme) => string;
    }): void;
    deleteRule(selector: string): void;
    private readonly icons;
    toIconClass(url: IconUrl, { size }?: {
        size: number;
    }): Reference<PluginIcon>;
    private iconSequence;
    protected createPluginIcon(key: PluginIconKey): PluginIcon;
    static toExternalIconUrl(iconUrl: string): string;
}
//# sourceMappingURL=plugin-shared-style.d.ts.map