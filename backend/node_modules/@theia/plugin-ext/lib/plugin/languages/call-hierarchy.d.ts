import { URI } from '@theia/core/shared/vscode-uri';
import * as theia from '@theia/plugin';
import { DocumentsExtImpl } from '../documents';
import * as dto from '../../common/plugin-api-rpc-model';
import * as rpc from '../../common/plugin-api-rpc';
export declare class CallHierarchyAdapter {
    private readonly provider;
    private readonly documents;
    constructor(provider: theia.CallHierarchyProvider, documents: DocumentsExtImpl);
    protected sessionIds: number;
    protected readonly cache: Map<string, Map<string, theia.CallHierarchyItem>>;
    provideRootDefinition(resource: URI, position: rpc.Position, token: theia.CancellationToken): Promise<dto.CallHierarchyItem[] | undefined>;
    provideCallers(definition: dto.CallHierarchyItem, token: theia.CancellationToken): Promise<dto.CallHierarchyIncomingCall[] | undefined>;
    provideCallees(definition: dto.CallHierarchyItem, token: theia.CancellationToken): Promise<dto.CallHierarchyOutgoingCall[] | undefined>;
    private fromCallHierarchyItem;
    private toCallHierarchyItem;
    private fromCallHierarchyIncomingCall;
    protected fromCallHierarchyOutgoingCall(caller: theia.CallHierarchyOutgoingCall, sessionId: string): dto.CallHierarchyOutgoingCall;
    releaseSession(session?: string): Promise<boolean>;
}
//# sourceMappingURL=call-hierarchy.d.ts.map