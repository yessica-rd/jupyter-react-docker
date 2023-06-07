import * as theia from '@theia/plugin';
import { RPCProtocol } from '../common/rpc-protocol';
import { ClipboardMain } from '../common';
export declare class ClipboardExt implements theia.Clipboard {
    protected readonly proxy: ClipboardMain;
    constructor(rpc: RPCProtocol);
    readText(): Promise<string>;
    writeText(value: string): Promise<void>;
}
//# sourceMappingURL=clipboard-ext.d.ts.map