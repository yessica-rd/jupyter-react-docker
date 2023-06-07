import { SecondaryWindowService } from './secondary-window-service';
import { WindowService } from './window-service';
export declare class DefaultSecondaryWindowService implements SecondaryWindowService {
    protected static SECONDARY_WINDOW_URL: string;
    /**
     * Randomized prefix to be included in opened windows' ids.
     * This avoids conflicts when creating sub-windows from multiple theia instances (e.g. by opening Theia multiple times in the same browser)
     */
    protected readonly prefix: number;
    /** Unique id. Increase after every access. */
    private nextId;
    protected secondaryWindows: Window[];
    protected readonly windowService: WindowService;
    init(): void;
    createSecondaryWindow(onClose?: (closedWin: Window) => void): Window | undefined;
    protected doCreateSecondaryWindow(onClose?: (closedWin: Window) => void): Window | undefined;
    protected handleWindowClosed(win: Window, onClose?: (closedWin: Window) => void): void;
    focus(win: Window): void;
    protected nextWindowId(): string;
}
//# sourceMappingURL=default-secondary-window-service.d.ts.map