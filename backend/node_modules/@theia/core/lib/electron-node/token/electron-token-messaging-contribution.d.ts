/// <reference types="node" />
import * as http from 'http';
import { MessagingContribution } from '../../node/messaging/messaging-contribution';
import { ElectronTokenValidator } from './electron-token-validator';
/**
 * Override the browser MessagingContribution class to refuse connections that do not include a specific token.
 * @deprecated since 1.8.0
 */
export declare class ElectronMessagingContribution extends MessagingContribution {
    protected readonly tokenValidator: ElectronTokenValidator;
    /**
     * Only allow token-bearers.
     */
    protected allowConnect(request: http.IncomingMessage): Promise<boolean>;
}
//# sourceMappingURL=electron-token-messaging-contribution.d.ts.map