import * as theia from '@theia/plugin';
import { RPCProtocol } from '../common/rpc-protocol';
import { TabGroupDto, TabOperation, TabsExt } from '../common/plugin-api-rpc';
export declare class TabsExtImpl implements TabsExt {
    readonly rpc: RPCProtocol;
    readonly _serviceBrand: undefined;
    private readonly proxy;
    private readonly onDidChangeTabs;
    private readonly onDidChangeTabGroups;
    private activeGroupId;
    private tabGroupArr;
    private apiObject;
    constructor(rpc: RPCProtocol);
    get tabGroups(): theia.TabGroups;
    $acceptEditorTabModel(tabGroups: TabGroupDto[]): void;
    $acceptTabGroupUpdate(groupDto: TabGroupDto): void;
    $acceptTabOperation(operation: TabOperation): void;
    private _findExtHostTabFromApi;
    private _findExtHostTabGroupFromApi;
    private _closeTabs;
    private _closeGroups;
}
//# sourceMappingURL=tabs.d.ts.map