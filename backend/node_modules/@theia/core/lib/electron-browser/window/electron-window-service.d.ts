import { NewWindowOptions } from '../../common/window';
import { DefaultWindowService } from '../../browser/window/default-window-service';
import { ElectronMainWindowService } from '../../electron-common/electron-main-window-service';
import { ElectronWindowPreferences } from './electron-window-preferences';
export declare class ElectronWindowService extends DefaultWindowService {
    /**
     * Lock to prevent multiple parallel executions of the `beforeunload` listener.
     */
    protected isUnloading: boolean;
    /**
     * Close the window right away when `true`, else check if we can unload.
     */
    protected closeOnUnload: boolean;
    protected readonly delegate: ElectronMainWindowService;
    protected readonly electronWindowPreferences: ElectronWindowPreferences;
    openNewWindow(url: string, { external }?: NewWindowOptions): undefined;
    openNewDefaultWindow(): void;
    protected init(): void;
    protected registerUnloadListeners(): void;
    /**
     * Updates the window zoom level based on the preference value.
     */
    protected updateWindowZoomLevel(): Promise<void>;
    reload(): void;
}
//# sourceMappingURL=electron-window-service.d.ts.map