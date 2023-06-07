/**
 * **IMPORTANT** this code is running in the plugin host process and should be closed as possible to VS Code counterpart:
 * https://github.com/microsoft/vscode/blob/04c36be045a94fee58e5f8992d3e3fd980294a84/src/vs/workbench/api/common/extHostFileSystemEventService.ts
 * One should be able to diff them to see differences.
 */
import { IRelativePattern } from '@theia/core/lib/common/glob';
import { UriComponents } from '@theia/core/shared/vscode-uri';
import { EditorsAndDocumentsExtImpl as ExtHostDocumentsAndEditors } from './editors-and-documents';
import type * as vscode from '@theia/plugin';
import { FileOperation } from '@theia/filesystem/lib/common/files';
import { CancellationToken } from '@theia/core/lib/common/cancellation';
import { Plugin, TextEditorsMain as MainThreadTextEditorsShape, FileSystemEvents, ExtHostFileSystemEventServiceShape } from '../common/plugin-api-rpc';
import { RPCProtocol } from '../common/rpc-protocol';
declare type Event<T> = vscode.Event<T>;
declare type IExtensionDescription = Plugin;
export declare class ExtHostFileSystemEventService implements ExtHostFileSystemEventServiceShape {
    private readonly _extHostDocumentsAndEditors;
    private readonly _mainThreadTextEditors;
    private readonly _onFileSystemEvent;
    private readonly _onDidRenameFile;
    private readonly _onDidCreateFile;
    private readonly _onDidDeleteFile;
    private readonly _onWillRenameFile;
    private readonly _onWillCreateFile;
    private readonly _onWillDeleteFile;
    readonly onDidRenameFile: Event<vscode.FileRenameEvent>;
    readonly onDidCreateFile: Event<vscode.FileCreateEvent>;
    readonly onDidDeleteFile: Event<vscode.FileDeleteEvent>;
    constructor(rpc: RPCProtocol, _extHostDocumentsAndEditors: ExtHostDocumentsAndEditors, _mainThreadTextEditors?: MainThreadTextEditorsShape);
    createFileSystemWatcher(globPattern: string | IRelativePattern, ignoreCreateEvents?: boolean, ignoreChangeEvents?: boolean, ignoreDeleteEvents?: boolean): vscode.FileSystemWatcher;
    $onFileEvent(events: FileSystemEvents): void;
    $onDidRunFileOperation(operation: FileOperation, target: UriComponents, source: UriComponents | undefined): void;
    getOnWillRenameFileEvent(extension: IExtensionDescription): Event<vscode.FileWillRenameEvent>;
    getOnWillCreateFileEvent(extension: IExtensionDescription): Event<vscode.FileWillCreateEvent>;
    getOnWillDeleteFileEvent(extension: IExtensionDescription): Event<vscode.FileWillDeleteEvent>;
    private _createWillExecuteEvent;
    $onWillRunFileOperation(operation: FileOperation, target: UriComponents, source: UriComponents | undefined, timeout: number, token: CancellationToken): Promise<any>;
    private _fireWillEvent;
}
export {};
//# sourceMappingURL=file-system-event-service-ext-impl.d.ts.map