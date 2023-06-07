import { FileSystemWatcherServer, WatchOptions, FileSystemWatcherClient, FileSystemWatcherService } from '../common/filesystem-watcher-protocol';
import { FileSystemWatcherServiceDispatcher } from './filesystem-watcher-dispatcher';
export declare const NSFW_WATCHER = "nsfw-watcher";
/**
 * Wraps the NSFW singleton service for each frontend.
 */
export declare class FileSystemWatcherServerClient implements FileSystemWatcherServer {
    protected static clientIdSequence: number;
    /**
     * Track allocated watcherIds to de-allocate on disposal.
     */
    protected watcherIds: Set<number>;
    /**
     * @todo make this number precisely map to one specific frontend.
     */
    protected readonly clientId: number;
    protected readonly watcherDispatcher: FileSystemWatcherServiceDispatcher;
    protected readonly watcherService: FileSystemWatcherService;
    watchFileChanges(uri: string, options?: WatchOptions): Promise<number>;
    unwatchFileChanges(watcherId: number): Promise<void>;
    setClient(client: FileSystemWatcherClient | undefined): void;
    dispose(): void;
}
//# sourceMappingURL=filesystem-watcher-client.d.ts.map