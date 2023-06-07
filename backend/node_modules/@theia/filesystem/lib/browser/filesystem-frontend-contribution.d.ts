import URI from '@theia/core/lib/common/uri';
import { MaybePromise, SelectionService, Emitter } from '@theia/core/lib/common';
import { Command, CommandContribution, CommandRegistry } from '@theia/core/lib/common/command';
import { FrontendApplicationContribution, ApplicationShell, NavigatableWidget, WidgetManager, FrontendApplication, CorePreferences } from '@theia/core/lib/browser';
import { MimeService } from '@theia/core/lib/browser/mime-service';
import { FileSystemPreferences } from './filesystem-preferences';
import { FileSelection } from './file-selection';
import { FileUploadService, FileUploadResult } from './file-upload-service';
import { FileService, UserFileOperationEvent } from './file-service';
import { FileChangesEvent, FileChangeType } from '../common/files';
import { Deferred } from '@theia/core/lib/common/promise-util';
export declare namespace FileSystemCommands {
    const UPLOAD: Command;
}
export interface NavigatableWidgetMoveSnapshot {
    dirty?: object;
    view?: object;
}
export declare class FileSystemFrontendContribution implements FrontendApplicationContribution, CommandContribution {
    protected readonly shell: ApplicationShell;
    protected readonly widgetManager: WidgetManager;
    protected readonly mimeService: MimeService;
    protected readonly preferences: FileSystemPreferences;
    protected readonly corePreferences: CorePreferences;
    protected readonly selectionService: SelectionService;
    protected readonly uploadService: FileUploadService;
    protected readonly fileService: FileService;
    protected onDidChangeEditorFileEmitter: Emitter<{
        editor: NavigatableWidget;
        type: FileChangeType;
    }>;
    readonly onDidChangeEditorFile: import("@theia/core/lib/common").Event<{
        editor: NavigatableWidget;
        type: FileChangeType;
    }>;
    protected readonly userOperations: Map<number, Deferred<void>>;
    protected queueUserOperation(event: UserFileOperationEvent): void;
    protected resolveUserOperation(event: UserFileOperationEvent): void;
    initialize(): void;
    onStart?(app: FrontendApplication): MaybePromise<void>;
    registerCommands(commands: CommandRegistry): void;
    protected canUpload({ fileStat }: FileSelection): boolean;
    protected upload(selection: FileSelection): Promise<FileUploadResult | undefined>;
    protected getSelection(...args: unknown[]): FileSelection | undefined;
    protected toSelection(arg: unknown): FileSelection | undefined;
    protected pendingOperation: Promise<void>;
    protected run(operation: () => MaybePromise<void>): Promise<void>;
    protected runEach(participant: (resourceUri: URI, widget: NavigatableWidget) => Promise<void>): Promise<void>;
    protected readonly moveSnapshots: Map<string, NavigatableWidgetMoveSnapshot>;
    protected popMoveSnapshot(resourceUri: URI): NavigatableWidgetMoveSnapshot | undefined;
    protected applyMoveSnapshot(widget: NavigatableWidget, snapshot: NavigatableWidgetMoveSnapshot | undefined): void;
    protected pushMove(resourceUri: URI, widget: NavigatableWidget, event: UserFileOperationEvent): Promise<void>;
    protected revertMove(resourceUri: URI, widget: NavigatableWidget, event: UserFileOperationEvent): Promise<void>;
    protected applyMove(resourceUri: URI, widget: NavigatableWidget, event: UserFileOperationEvent): Promise<void>;
    protected createMoveToUri(resourceUri: URI, widget: NavigatableWidget, event: UserFileOperationEvent): URI | undefined;
    protected readonly deletedSuffix: string;
    protected updateWidgets(event: FileChangesEvent): Promise<void>;
    protected updateWidget(uri: URI, widget: NavigatableWidget, event: FileChangesEvent, { dirty, toClose }: {
        dirty: Set<string>;
        toClose: Map<string, NavigatableWidget[]>;
    }): void;
    protected updateAssociations(): void;
}
//# sourceMappingURL=filesystem-frontend-contribution.d.ts.map