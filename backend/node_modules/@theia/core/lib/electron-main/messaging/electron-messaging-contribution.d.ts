import { WebContents } from '@theia/electron/shared/electron';
import { ContributionProvider } from '../../common/contribution-provider';
import { MessagingContribution } from '../../node/messaging/messaging-contribution';
import { ElectronMainApplicationContribution } from '../electron-main-application';
import { ElectronMessagingService } from './electron-messaging-service';
import { AbstractChannel, Channel, ChannelMultiplexer, MessageProvider } from '../../common/message-rpc/channel';
import { ConnectionHandler, Emitter, WriteBuffer } from '../../common';
/**
 * This component replicates the role filled by `MessagingContribution` but for Electron.
 * Unlike the WebSocket based implementation, we do not expect to receive
 * connection events. Instead, we'll create channels based on incoming `open`
 * events on the `ipcMain` channel.
 * This component allows communication between renderer process (frontend) and electron main process.
 */
export declare class ElectronMessagingContribution implements ElectronMainApplicationContribution, ElectronMessagingService {
    protected readonly messagingContributions: ContributionProvider<ElectronMessagingService.Contribution>;
    protected readonly connectionHandlers: ContributionProvider<ConnectionHandler>;
    protected readonly channelHandlers: MessagingContribution.ConnectionHandlers<Channel>;
    /**
     * Each electron window has a main channel and its own multiplexer to route multiple client messages the same IPC connection.
     */
    protected readonly windowChannelMultiplexer: Map<number, {
        channel: ElectronWebContentChannel;
        multiplexer: ChannelMultiplexer;
    }>;
    protected init(): void;
    protected handleIpcEvent(sender: WebContents, data: Uint8Array): void;
    protected createWindowChannelData(sender: Electron.WebContents): {
        channel: ElectronWebContentChannel;
        multiplexer: ChannelMultiplexer;
    };
    /**
     * Creates the main channel to a window.
     * @param sender The window that the channel should be established to.
     */
    protected createWindowMainChannel(sender: WebContents): ElectronWebContentChannel;
    protected disposeMultiplexer(windowId: number, multiplexer: ChannelMultiplexer, reason: string): void;
    onStart(): void;
    ipcChannel(spec: string, callback: (params: any, channel: Channel) => void): void;
}
/**
 * Used to establish a connection between the ipcMain and the Electron frontend (window).
 * Messages a transferred via electron IPC.
 */
export declare class ElectronWebContentChannel extends AbstractChannel {
    protected readonly sender: Electron.WebContents;
    readonly onMessageEmitter: Emitter<MessageProvider>;
    constructor(sender: Electron.WebContents);
    getWriteBuffer(): WriteBuffer;
}
//# sourceMappingURL=electron-messaging-contribution.d.ts.map