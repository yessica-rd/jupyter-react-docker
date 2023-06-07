import { EnvVariablesServer } from '@theia/core/lib/common/env-variables';
import { FileSystemProvider } from '@theia/filesystem/lib/common/files';
import { FileService, FileServiceContribution } from '@theia/filesystem/lib/browser/file-service';
export declare class UserStorageContribution implements FileServiceContribution {
    protected readonly environments: EnvVariablesServer;
    registerFileSystemProviders(service: FileService): void;
    protected createProvider(service: FileService): Promise<FileSystemProvider>;
}
//# sourceMappingURL=user-storage-contribution.d.ts.map