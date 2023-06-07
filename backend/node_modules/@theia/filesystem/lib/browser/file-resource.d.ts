import { Resource, ResourceVersion, ResourceResolver, ResourceSaveOptions } from '@theia/core/lib/common/resource';
import { DisposableCollection } from '@theia/core/lib/common/disposable';
import { Emitter, Event } from '@theia/core/lib/common/event';
import { Readable, ReadableStream } from '@theia/core/lib/common/stream';
import URI from '@theia/core/lib/common/uri';
import { FileReadStreamOptions } from '../common/files';
import { FileService } from './file-service';
import { LabelProvider } from '@theia/core/lib/browser/label-provider';
import { FrontendApplicationStateService } from '@theia/core/lib/browser/frontend-application-state';
export interface FileResourceVersion extends ResourceVersion {
    readonly encoding: string;
    readonly mtime: number;
    readonly etag: string;
}
export declare namespace FileResourceVersion {
    function is(version: ResourceVersion | undefined): version is FileResourceVersion;
}
export interface FileResourceOptions {
    isReadonly: boolean;
    shouldOverwrite: () => Promise<boolean>;
    shouldOpenAsText: (error: string) => Promise<boolean>;
}
export declare class FileResource implements Resource {
    readonly uri: URI;
    protected readonly fileService: FileService;
    protected readonly options: FileResourceOptions;
    protected acceptTextOnly: boolean;
    protected limits: FileReadStreamOptions['limits'];
    protected readonly toDispose: DisposableCollection;
    protected readonly onDidChangeContentsEmitter: Emitter<void>;
    readonly onDidChangeContents: Event<void>;
    protected _version: FileResourceVersion | undefined;
    get version(): FileResourceVersion | undefined;
    get encoding(): string | undefined;
    get isReadonly(): boolean;
    constructor(uri: URI, fileService: FileService, options: FileResourceOptions);
    dispose(): void;
    readContents(options?: {
        encoding?: string;
    }): Promise<string>;
    readStream(options?: {
        encoding?: string;
    }): Promise<ReadableStream<string>>;
    protected doWrite: (content: string | Readable<string>, options?: ResourceSaveOptions | undefined) => Promise<void>;
    saveStream?: Resource['saveStream'];
    saveContents?: Resource['saveContents'];
    saveContentChanges?: Resource['saveContentChanges'];
    protected updateSavingContentChanges(): void;
    protected doSaveContentChanges: Resource['saveContentChanges'];
    guessEncoding(): Promise<string>;
    protected sync(): Promise<void>;
    protected isInSync(): Promise<boolean>;
    protected shouldOverwrite(): Promise<boolean>;
    protected shouldOpenAsText(error: string): Promise<boolean>;
}
export declare class FileResourceResolver implements ResourceResolver {
    protected readonly fileService: FileService;
    protected readonly labelProvider: LabelProvider;
    protected readonly applicationState: FrontendApplicationStateService;
    resolve(uri: URI): Promise<FileResource>;
    protected shouldOverwrite(uri: URI): Promise<boolean>;
    protected shouldOpenAsText(uri: URI, error: string): Promise<boolean>;
}
//# sourceMappingURL=file-resource.d.ts.map