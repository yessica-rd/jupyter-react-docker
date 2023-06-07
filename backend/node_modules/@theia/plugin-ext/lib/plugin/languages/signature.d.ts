import { URI } from '@theia/core/shared/vscode-uri';
import * as theia from '@theia/plugin';
import { DocumentsExtImpl } from '../documents';
import { Position } from '../../common/plugin-api-rpc';
import { SignatureHelp, SignatureHelpContext } from '../../common/plugin-api-rpc-model';
export declare class SignatureHelpAdapter {
    private readonly delegate;
    private readonly documents;
    private idSequence;
    private readonly cache;
    constructor(delegate: theia.SignatureHelpProvider, documents: DocumentsExtImpl);
    provideSignatureHelp(resource: URI, position: Position, token: theia.CancellationToken, context: SignatureHelpContext): Promise<SignatureHelp | undefined>;
    private reviveContext;
    releaseSignatureHelp(id: number): void;
}
//# sourceMappingURL=signature.d.ts.map