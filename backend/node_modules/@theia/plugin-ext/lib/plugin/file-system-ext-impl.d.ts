/**
 * **IMPORTANT** this code is running in the plugin host process and should be closed as possible to VS Code counterpart:
 * https://github.com/microsoft/vscode/blob/04c36be045a94fee58e5f8992d3e3fd980294a84/src/vs/workbench/api/common/extHostFileSystem.ts
 * One should be able to diff them to see differences.
 */
import { UriComponents } from '@theia/core/shared/vscode-uri';
import { RPCProtocol } from '../common/rpc-protocol';
import { FileSystemExt } from '../common/plugin-api-rpc';
import * as vscode from '@theia/plugin';
import * as files from '@theia/filesystem/lib/common/files';
import { BinaryBuffer } from '@theia/core/lib/common/buffer';
export declare class FsLinkProvider {
    private _schemes;
    private _stateMachine?;
    add(scheme: string): void;
    delete(scheme: string): void;
    private _initStateMachine;
    provideDocumentLinks(document: vscode.TextDocument): vscode.ProviderResult<vscode.DocumentLink[]>;
}
export declare class FileSystemExtImpl implements FileSystemExt {
    private readonly _proxy;
    private readonly _linkProvider;
    private readonly _fsProvider;
    private readonly _capabilities;
    private readonly _usedSchemes;
    private readonly _watches;
    private readonly onWillRegisterFileSystemProviderEmitter;
    readonly onWillRegisterFileSystemProvider: import("vscode-jsonrpc/lib/common/events").Event<FsLinkProvider>;
    private _handlePool;
    readonly fileSystem: vscode.FileSystem;
    constructor(rpc: RPCProtocol);
    dispose(): void;
    registerFileSystemProvider(scheme: string, provider: vscode.FileSystemProvider, options?: {
        isCaseSensitive?: boolean;
        isReadonly?: boolean;
    }): {
        dispose: () => void;
    };
    private static _asIStat;
    $acceptProviderInfos(scheme: string, capabilities?: files.FileSystemProviderCapabilities): void;
    $stat(handle: number, resource: UriComponents): Promise<files.Stat>;
    $readdir(handle: number, resource: UriComponents): Promise<[string, files.FileType][]>;
    $readFile(handle: number, resource: UriComponents): Promise<BinaryBuffer>;
    $writeFile(handle: number, resource: UriComponents, content: BinaryBuffer, opts: files.FileWriteOptions): Promise<void>;
    $delete(handle: number, resource: UriComponents, opts: files.FileDeleteOptions): Promise<void>;
    $rename(handle: number, oldUri: UriComponents, newUri: UriComponents, opts: files.FileOverwriteOptions): Promise<void>;
    $copy(handle: number, oldUri: UriComponents, newUri: UriComponents, opts: files.FileOverwriteOptions): Promise<void>;
    $mkdir(handle: number, resource: UriComponents): Promise<void>;
    $watch(handle: number, session: number, resource: UriComponents, opts: files.WatchOptions): void;
    $unwatch(_handle: number, session: number): void;
    $open(handle: number, resource: UriComponents, opts: files.FileOpenOptions): Promise<number>;
    $close(handle: number, fd: number): Promise<void>;
    $read(handle: number, fd: number, pos: number, length: number): Promise<BinaryBuffer>;
    $write(handle: number, fd: number, pos: number, data: BinaryBuffer): Promise<number>;
    private _getFsProvider;
}
//# sourceMappingURL=file-system-ext-impl.d.ts.map