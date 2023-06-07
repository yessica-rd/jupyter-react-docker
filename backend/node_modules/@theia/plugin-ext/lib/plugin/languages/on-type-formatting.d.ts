import * as theia from '@theia/plugin';
import { DocumentsExtImpl } from '../documents';
import { URI } from '@theia/core/shared/vscode-uri';
import { FormattingOptions, TextEdit } from '../../common/plugin-api-rpc-model';
import { Position } from '../../common/plugin-api-rpc';
export declare class OnTypeFormattingAdapter {
    private readonly provider;
    private readonly documents;
    constructor(provider: theia.OnTypeFormattingEditProvider, documents: DocumentsExtImpl);
    provideOnTypeFormattingEdits(resource: URI, position: Position, ch: string, options: FormattingOptions, token: theia.CancellationToken): Promise<TextEdit[] | undefined>;
}
//# sourceMappingURL=on-type-formatting.d.ts.map