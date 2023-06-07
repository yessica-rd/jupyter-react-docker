export declare const SecondaryWindowService: unique symbol;
/**
 * Service for opening new secondary windows to contain widgets extracted from the application shell.
 *
 * @experimental The functionality provided by this service and its implementation is still under development. Use with caution.
 */
export interface SecondaryWindowService {
    /**
     * Creates a new secondary window for a widget to be extracted from the application shell.
     * The created window is closed automatically when the current theia instance is closed.
     *
     * @param onClose optional callback that is invoked when the secondary window is closed
     * @returns the created window or `undefined` if it could not be created
     */
    createSecondaryWindow(onClose?: (win: Window) => void): Window | undefined;
    /** Handles focussing the given secondary window in the browser and on Electron. */
    focus(win: Window): void;
}
//# sourceMappingURL=secondary-window-service.d.ts.map