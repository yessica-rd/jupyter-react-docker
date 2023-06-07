import { ContributionProvider } from '../common/contribution-provider';
import { FrontendApplicationContribution } from './frontend-application';
import { MaybePromise } from '../common';
import { Deferred } from '../common/promise-util';
import { RequestService } from '@theia/request';
export interface JsonSchemaConfiguration {
    fileMatch: string | string[];
    url: string;
}
export interface JsonSchemaRegisterContext {
    registerSchema(config: JsonSchemaConfiguration): void;
}
export declare const JsonSchemaContribution: unique symbol;
export interface JsonSchemaContribution {
    registerSchemas(store: JsonSchemaRegisterContext): MaybePromise<void>;
}
export declare class JsonSchemaStore implements FrontendApplicationContribution {
    protected readonly contributions: ContributionProvider<JsonSchemaContribution>;
    protected readonly _schemas: Deferred<JsonSchemaConfiguration[]>;
    get schemas(): Promise<JsonSchemaConfiguration[]>;
    onStart(): void;
    protected getRegisterTimeout(): number;
}
export declare class DefaultJsonSchemaContribution implements JsonSchemaContribution {
    protected readonly requestService: RequestService;
    registerSchemas(context: JsonSchemaRegisterContext): Promise<void>;
}
export declare namespace DefaultJsonSchemaContribution {
    interface SchemaData {
        name: string;
        description: string;
        fileMatch?: string[];
        url: string;
        schema: any;
    }
}
//# sourceMappingURL=json-schema-store.d.ts.map