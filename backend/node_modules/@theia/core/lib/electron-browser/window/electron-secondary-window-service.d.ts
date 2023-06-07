import { DefaultSecondaryWindowService } from '../../browser/window/default-secondary-window-service';
export declare class ElectronSecondaryWindowService extends DefaultSecondaryWindowService {
    focus(win: Window): void;
    protected doCreateSecondaryWindow(onClose?: (closedWin: Window) => void): Window | undefined;
}
//# sourceMappingURL=electron-secondary-window-service.d.ts.map