import URI from '../common/uri';
import { MaybePromise, SelectionService } from '../common';
import { EnvVariablesServer } from '../common/env-variables';
export declare class UserWorkingDirectoryProvider {
    protected readonly selectionService: SelectionService;
    protected readonly envVariables: EnvVariablesServer;
    /**
     * @returns A {@link URI} that represents a good guess about the directory in which the user is currently operating.
     *
     * Factors considered may include the current widget, current selection, user home directory, or other application state.
     */
    getUserWorkingDir(): Promise<URI>;
    protected getFromSelection(): MaybePromise<URI | undefined>;
    protected getFromUserHome(): MaybePromise<URI>;
    protected ensureIsDirectory(uri?: URI): MaybePromise<URI | undefined>;
}
//# sourceMappingURL=user-working-directory-provider.d.ts.map