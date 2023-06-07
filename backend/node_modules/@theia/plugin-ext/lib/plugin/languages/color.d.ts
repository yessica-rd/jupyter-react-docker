import * as theia from '@theia/plugin';
import { URI } from '@theia/core/shared/vscode-uri';
import { DocumentsExtImpl } from '../documents';
import { RawColorInfo } from '../../common/plugin-api-rpc';
import { ColorPresentation } from '../../common/plugin-api-rpc-model';
export declare class ColorProviderAdapter {
    private documents;
    private provider;
    constructor(documents: DocumentsExtImpl, provider: theia.DocumentColorProvider);
    provideColors(resource: URI, token: theia.CancellationToken): Promise<RawColorInfo[]>;
    provideColorPresentations(resource: URI, raw: RawColorInfo, token: theia.CancellationToken): Promise<ColorPresentation[]>;
}
//# sourceMappingURL=color.d.ts.map