import { interfaces } from '@theia/core/shared/inversify';
import { MessageRegistryMain, MainMessageType, MainMessageOptions, MainMessageItem } from '../../common/plugin-api-rpc';
export declare class MessageRegistryMainImpl implements MessageRegistryMain {
    private readonly messageService;
    constructor(container: interfaces.Container);
    $showMessage(type: MainMessageType, message: string, options: MainMessageOptions, actions: MainMessageItem[]): Promise<number | undefined>;
    protected doShowMessage(type: MainMessageType, message: string, options: MainMessageOptions, actions: MainMessageItem[]): Promise<string | undefined>;
}
//# sourceMappingURL=message-registry-main.d.ts.map