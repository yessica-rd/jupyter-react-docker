import { JsonSchemaRegisterContext, JsonSchemaContribution } from '@theia/core/lib/browser/json-schema-store';
import { InMemoryResources } from '@theia/core/lib/common';
import URI from '@theia/core/lib/common/uri';
import { DebugService } from '../common/debug-service';
import { WorkspaceService } from '@theia/workspace/lib/browser';
export declare class DebugSchemaUpdater implements JsonSchemaContribution {
    protected readonly uri: URI;
    protected readonly inmemoryResources: InMemoryResources;
    protected readonly workspaceService: WorkspaceService;
    protected readonly debug: DebugService;
    protected init(): void;
    registerSchemas(context: JsonSchemaRegisterContext): void;
    update(): Promise<void>;
}
export declare const launchSchemaId = "vscode://schemas/launch";
//# sourceMappingURL=debug-schema-updater.d.ts.map