import { InMemoryResources } from '@theia/core';
import { JsonSchemaRegisterContext, JsonSchemaContribution } from '@theia/core/lib/browser/json-schema-store';
import { PreferenceSchemaProvider } from '@theia/core/lib/browser/preferences/preference-contribution';
import { PreferenceConfigurations } from '@theia/core/lib/browser/preferences/preference-configurations';
import { WorkspaceService } from '@theia/workspace/lib/browser';
export declare class PreferencesJsonSchemaContribution implements JsonSchemaContribution {
    private serializeSchema;
    protected readonly schemaProvider: PreferenceSchemaProvider;
    protected readonly inmemoryResources: InMemoryResources;
    protected readonly preferenceConfigurations: PreferenceConfigurations;
    protected readonly workspaceService: WorkspaceService;
    registerSchemas(context: JsonSchemaRegisterContext): void;
    private registerSchema;
    private updateInMemoryResources;
    private getSchemaURIForScope;
    private getFileMatch;
}
//# sourceMappingURL=preferences-json-schema-contribution.d.ts.map