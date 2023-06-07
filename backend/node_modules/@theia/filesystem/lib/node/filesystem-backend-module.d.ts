import { ContainerModule, interfaces } from '@theia/core/shared/inversify';
import { FileSystemWatcherService } from '../common/filesystem-watcher-protocol';
export declare const NSFW_SINGLE_THREADED: boolean;
export declare const NSFW_WATCHER_VERBOSE: boolean;
export declare const NsfwFileSystemWatcherServiceProcessOptions: unique symbol;
/**
 * Options to control the way the `NsfwFileSystemWatcherService` process is spawned.
 */
export interface NsfwFileSystemWatcherServiceProcessOptions {
    /**
     * Path to the script that will run the `NsfwFileSystemWatcherService` in a new process.
     */
    entryPoint: string;
}
declare const _default: ContainerModule;
export default _default;
export declare function bindFileSystemWatcherServer(bind: interfaces.Bind): void;
/**
 * Run the watch server in the current process.
 */
export declare function createNsfwFileSystemWatcherService(ctx: interfaces.Context): FileSystemWatcherService;
/**
 * Run the watch server in a child process.
 * Return a proxy forwarding calls to the child process.
 */
export declare function spawnNsfwFileSystemWatcherServiceProcess(ctx: interfaces.Context): FileSystemWatcherService;
//# sourceMappingURL=filesystem-backend-module.d.ts.map