import { Navigatable, SaveableSource, SaveOptions, Widget, OpenerService } from '@theia/core/lib/browser';
import { SaveResourceService } from '@theia/core/lib/browser/save-resource-service';
import URI from '@theia/core/lib/common/uri';
import { FileService } from './file-service';
import { FileDialogService } from './file-dialog';
export declare class FilesystemSaveResourceService extends SaveResourceService {
    protected readonly fileService: FileService;
    protected readonly fileDialogService: FileDialogService;
    protected readonly openerService: OpenerService;
    /**
     * This method ensures a few things about `widget`:
     * - `widget.getResourceUri()` actually returns a URI.
     * - `widget.saveable.createSnapshot` is defined.
     * - `widget.saveable.revert` is defined.
     */
    canSaveAs(widget: Widget | undefined): widget is Widget & SaveableSource & Navigatable;
    /**
     * Save `sourceWidget` to a new file picked by the user.
     */
    saveAs(sourceWidget: Widget & SaveableSource & Navigatable, options?: SaveOptions): Promise<void>;
    /**
     * @param sourceWidget widget to save as `target`.
     * @param target The new URI for the widget.
     * @param overwrite
     */
    private copyAndSave;
    confirmOverwrite(uri: URI): Promise<boolean>;
    private isElectron;
}
//# sourceMappingURL=filesystem-save-resource-service.d.ts.map