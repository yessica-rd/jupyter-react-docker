import { LocalizationExt, Plugin, StringDetails } from '../common';
import { RPCProtocol } from '../common/rpc-protocol';
import { URI } from './types-impl';
export declare class LocalizationExtImpl implements LocalizationExt {
    private readonly _proxy;
    private currentLanguage?;
    private isDefaultLanguage;
    private readonly bundleCache;
    constructor(rpc: RPCProtocol);
    translateMessage(pluginId: string, details: StringDetails): string;
    getBundle(pluginId: string): {
        [key: string]: string;
    } | undefined;
    getBundleUri(pluginId: string): URI | undefined;
    initializeLocalizedMessages(plugin: Plugin, currentLanguage: string): Promise<void>;
}
//# sourceMappingURL=localization-ext.d.ts.map