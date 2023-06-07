import { interfaces } from '@theia/core/shared/inversify';
import * as theia from '@theia/plugin';
import { Disposable, DisposableCollection } from '@theia/core/lib/common/disposable';
import { CommandRegistryMain } from '../../common/plugin-api-rpc';
import { RPCProtocol } from '../../common/rpc-protocol';
export declare class CommandRegistryMainImpl implements CommandRegistryMain, Disposable {
    private readonly proxy;
    private readonly commands;
    private readonly handlers;
    private readonly delegate;
    private readonly keyBinding;
    private readonly contributions;
    protected readonly toDispose: DisposableCollection;
    constructor(rpc: RPCProtocol, container: interfaces.Container);
    dispose(): void;
    $registerCommand(command: theia.CommandDescription): void;
    $unregisterCommand(id: string): void;
    $registerHandler(id: string): void;
    $unregisterHandler(id: string): void;
    $executeCommand<T>(id: string, ...args: any[]): Promise<T | undefined>;
    $getKeyBinding(commandId: string): PromiseLike<theia.CommandKeyBinding[] | undefined>;
    $getCommands(): PromiseLike<string[]>;
}
//# sourceMappingURL=command-registry-main.d.ts.map