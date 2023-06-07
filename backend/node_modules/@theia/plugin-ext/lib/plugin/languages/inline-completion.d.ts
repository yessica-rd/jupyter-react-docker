import * as theia from '@theia/plugin';
import { DocumentsExtImpl } from '../documents';
import { URI } from '@theia/core/shared/vscode-uri';
import { CommandRegistryImpl } from '../command-registry';
import { InlineCompletionContext } from '../../common/plugin-api-rpc-model';
import { IdentifiableInlineCompletions, Position } from '../../common/plugin-api-rpc';
export declare class InlineCompletionAdapterBase {
    provideInlineCompletions(_resource: URI, _position: Position, _context: InlineCompletionContext, _token: theia.CancellationToken): Promise<IdentifiableInlineCompletions | undefined>;
    disposeCompletions(pid: number): void;
}
export declare class InlineCompletionAdapter extends InlineCompletionAdapterBase {
    private readonly documents;
    private readonly provider;
    private readonly commands;
    private readonly references;
    constructor(documents: DocumentsExtImpl, provider: theia.InlineCompletionItemProvider, commands: CommandRegistryImpl);
    private readonly languageTriggerKindToVSCodeTriggerKind;
    provideInlineCompletions(resource: URI, position: Position, context: InlineCompletionContext, token: theia.CancellationToken): Promise<IdentifiableInlineCompletions | undefined>;
    disposeCompletions(pid: number): void;
}
//# sourceMappingURL=inline-completion.d.ts.map