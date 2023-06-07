import { FrontendApplicationConfig } from '@theia/application-package';
import { FrontendApplicationState, StopReason } from '../common/frontend-application-state';
import { BrowserWindow, BrowserWindowConstructorOptions } from '../../electron-shared/electron';
import { ElectronMainApplicationGlobals } from './electron-main-constants';
import { DisposableCollection, Emitter, Event } from '../common';
/**
 * Theia tracks the maximized state of Electron Browser Windows.
 */
export interface TheiaBrowserWindowOptions extends BrowserWindowConstructorOptions {
    isMaximized?: boolean;
    isFullScreen?: boolean;
    /**
     * Represents the complete screen layout for all available displays.
     * This field is used to determine if the layout was updated since the electron window was last opened,
     * in which case we want to invalidate the stored options and use the default options instead.
     */
    screenLayout?: string;
}
export declare const TheiaBrowserWindowOptions: unique symbol;
export declare const WindowApplicationConfig: unique symbol;
export declare type WindowApplicationConfig = FrontendApplicationConfig;
export declare class TheiaElectronWindow {
    protected readonly options: TheiaBrowserWindowOptions;
    protected readonly config: WindowApplicationConfig;
    protected readonly globals: ElectronMainApplicationGlobals;
    protected onDidCloseEmitter: Emitter<void>;
    get onDidClose(): Event<void>;
    protected readonly toDispose: DisposableCollection;
    protected _window: BrowserWindow;
    get window(): BrowserWindow;
    protected closeIsConfirmed: boolean;
    protected applicationState: FrontendApplicationState;
    protected init(): void;
    /**
     * Only show the window when the content is ready.
     */
    protected attachReadyToShow(): void;
    protected attachCloseListeners(): void;
    protected doCloseWindow(): void;
    close(reason?: StopReason): Promise<boolean>;
    protected reload(): void;
    protected handleStopRequest(onSafeCallback: () => unknown, reason: StopReason): Promise<boolean>;
    protected checkSafeToStop(reason: StopReason): Promise<boolean>;
    protected restoreMaximizedState(): void;
    protected trackApplicationState(): void;
    protected attachReloadListener(): void;
    dispose(): void;
}
export interface TheiaElectronWindowFactory {
    (options: TheiaBrowserWindowOptions, config: FrontendApplicationConfig): TheiaElectronWindow;
}
export declare const TheiaElectronWindowFactory: unique symbol;
//# sourceMappingURL=theia-electron-window.d.ts.map