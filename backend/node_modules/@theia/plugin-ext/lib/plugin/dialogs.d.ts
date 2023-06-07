import { OpenDialogOptions, SaveDialogOptions, UploadDialogOptions } from '@theia/plugin';
import { RPCProtocol } from '../common/rpc-protocol';
import { URI } from './types-impl';
export declare class DialogsExtImpl {
    private proxy;
    constructor(rpc: RPCProtocol);
    showOpenDialog(options: OpenDialogOptions): PromiseLike<URI[] | undefined>;
    showSaveDialog(options: SaveDialogOptions): PromiseLike<URI | undefined>;
    showUploadDialog(options: UploadDialogOptions): PromiseLike<URI[] | undefined>;
}
//# sourceMappingURL=dialogs.d.ts.map