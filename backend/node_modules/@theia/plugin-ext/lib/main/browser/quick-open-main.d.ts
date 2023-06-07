import { InputBoxOptions } from '@theia/plugin';
import { interfaces } from '@theia/core/shared/inversify';
import { RPCProtocol } from '../../common/rpc-protocol';
import { QuickOpenMain, TransferInputBox, TransferQuickPickItems, TransferQuickInput, TransferQuickPickItemValue } from '../../common/plugin-api-rpc';
import { PickOptions } from '@theia/core/lib/browser';
import { DisposableCollection, Disposable } from '@theia/core/lib/common/disposable';
import { CancellationToken } from '@theia/core/lib/common/cancellation';
import { IQuickInput } from '@theia/monaco-editor-core/esm/vs/base/parts/quickinput/common/quickInput';
export interface QuickInputSession {
    input: IQuickInput;
    handlesToItems: Map<number, TransferQuickPickItems>;
}
export declare class QuickOpenMainImpl implements QuickOpenMain, Disposable {
    private quickInputService;
    private proxy;
    private delegate;
    private readonly items;
    protected readonly toDispose: DisposableCollection;
    constructor(rpc: RPCProtocol, container: interfaces.Container);
    dispose(): void;
    $show(instance: number, options: PickOptions<TransferQuickPickItemValue>, token: CancellationToken): Promise<number | number[] | undefined>;
    $setItems(instance: number, items: TransferQuickPickItems[]): Promise<any>;
    $setError(instance: number, error: Error): Promise<void>;
    $input(options: InputBoxOptions, validateInput: boolean, token: CancellationToken): Promise<string | undefined>;
    $showInputBox(options: TransferInputBox, validateInput: boolean): Promise<string | undefined>;
    private sessions;
    $createOrUpdate(params: TransferQuickInput): Promise<void>;
    $hide(): void;
    $dispose(sessionId: number): Promise<void>;
    private convertToQuickInputButtons;
}
//# sourceMappingURL=quick-open-main.d.ts.map