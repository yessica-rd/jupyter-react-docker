import { URI } from '@theia/core/shared/vscode-uri';
import * as theia from '@theia/plugin';
import { DocumentsExtImpl } from '../documents';
import { Hover } from '../../common/plugin-api-rpc-model';
import { Position } from '../../common/plugin-api-rpc';
export declare class HoverAdapter {
    private readonly provider;
    private readonly documents;
    constructor(provider: theia.HoverProvider, documents: DocumentsExtImpl);
    provideHover(resource: URI, position: Position, token: theia.CancellationToken): Promise<Hover | undefined>;
}
//# sourceMappingURL=hover.d.ts.map