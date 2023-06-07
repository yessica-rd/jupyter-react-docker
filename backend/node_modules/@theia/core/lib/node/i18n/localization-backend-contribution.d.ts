import * as express from 'express';
import { Deferred } from '../../common/promise-util';
import { BackendApplicationContribution } from '../backend-application';
import { LocalizationRegistry } from './localization-contribution';
import { LocalizationProvider } from './localization-provider';
export declare class LocalizationBackendContribution implements BackendApplicationContribution {
    protected readonly initialized: Deferred<void>;
    protected readonly localizationRegistry: LocalizationRegistry;
    protected readonly localizationProvider: LocalizationProvider;
    initialize(): Promise<void>;
    waitForInitialization(): Promise<void>;
    configure(app: express.Application): void;
}
//# sourceMappingURL=localization-backend-contribution.d.ts.map