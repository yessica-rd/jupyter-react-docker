import { URI } from '@theia/core/shared/vscode-uri';
import * as theia from '@theia/plugin';
import { DocumentsExtImpl } from '../documents';
import { DocumentLink } from '../../common/plugin-api-rpc-model';
export declare class LinkProviderAdapter {
    private readonly provider;
    private readonly documents;
    private cacheId;
    private cache;
    constructor(provider: theia.DocumentLinkProvider, documents: DocumentsExtImpl);
    provideLinks(resource: URI, token: theia.CancellationToken): Promise<DocumentLink[] | undefined>;
    resolveLink(link: DocumentLink, token: theia.CancellationToken): Promise<DocumentLink | undefined>;
    releaseDocumentLinks(ids: number[]): void;
}
//# sourceMappingURL=link-provider.d.ts.map