import { WebSocketConnectionProvider, WebSocketOptions } from '../../browser/messaging/ws-connection-provider';
import { FrontendApplicationContribution } from '../../browser/frontend-application';
import { Channel } from '../../common';
/**
 * Customized connection provider between the frontend and the backend in electron environment.
 * This customized connection provider makes sure the websocket connection does not try to reconnect
 * once the electron-browser window is refreshed. Otherwise, backend resources are not disposed.
 */
export declare class ElectronWebSocketConnectionProvider extends WebSocketConnectionProvider implements FrontendApplicationContribution {
    /**
     * Do not try to reconnect when the frontend application is stopping. The browser is navigating away from this page.
     */
    protected stopping: boolean;
    onStop(): void;
    openChannel(path: string, handler: (channel: Channel) => void, options?: WebSocketOptions): Promise<void>;
}
//# sourceMappingURL=electron-ws-connection-provider.d.ts.map