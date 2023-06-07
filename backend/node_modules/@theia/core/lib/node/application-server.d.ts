import { ApplicationServer, ExtensionInfo, ApplicationInfo } from '../common/application-protocol';
import { ApplicationPackage } from '@theia/application-package';
import { OS } from '../common/os';
export declare class ApplicationServerImpl implements ApplicationServer {
    protected readonly applicationPackage: ApplicationPackage;
    getExtensionsInfos(): Promise<ExtensionInfo[]>;
    getApplicationInfo(): Promise<ApplicationInfo | undefined>;
    getBackendOS(): Promise<OS.Type>;
}
//# sourceMappingURL=application-server.d.ts.map