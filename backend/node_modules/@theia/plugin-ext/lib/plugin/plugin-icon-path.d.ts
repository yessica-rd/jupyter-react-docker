import { URI } from './types-impl';
import { IconUrl } from '../common/plugin-protocol';
import { Plugin } from '../common/plugin-api-rpc';
export declare type PluginIconPath = string | URI | {
    light: string | URI;
    dark: string | URI;
};
export declare namespace PluginIconPath {
    function toUrl(iconPath: PluginIconPath | undefined, plugin: Plugin): IconUrl | undefined;
    function asString(arg: string | URI, plugin: Plugin): string;
}
//# sourceMappingURL=plugin-icon-path.d.ts.map