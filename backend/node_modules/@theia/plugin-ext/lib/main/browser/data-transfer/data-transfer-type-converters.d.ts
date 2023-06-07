import { IDataTransferItem, VSDataTransfer } from '@theia/monaco-editor-core/esm/vs/base/common/dataTransfer';
import { DataTransferDTO, DataTransferItemDTO } from '../../../common/plugin-api-rpc-model';
export declare namespace DataTransferItem {
    function from(mime: string, item: IDataTransferItem): Promise<DataTransferItemDTO>;
}
export declare namespace DataTransfer {
    function toDataTransferDTO(value: VSDataTransfer): Promise<DataTransferDTO>;
}
//# sourceMappingURL=data-transfer-type-converters.d.ts.map