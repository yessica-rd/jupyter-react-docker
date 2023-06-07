/// <reference types="react" />
import * as React from '@theia/core/shared/react';
import { ReactWidget, Message } from '@theia/core/lib/browser/widgets';
import { VSXExtensionsSearchModel } from './vsx-extensions-search-model';
export declare class VSXExtensionsSearchBar extends ReactWidget {
    protected readonly model: VSXExtensionsSearchModel;
    protected init(): void;
    protected input: HTMLInputElement | undefined;
    protected render(): React.ReactNode;
    protected updateQuery: (e: React.ChangeEvent<HTMLInputElement>) => string;
    protected updateSearchTerm(term: string): void;
    protected onActivateRequest(msg: Message): void;
    protected onAfterAttach(msg: Message): void;
}
//# sourceMappingURL=vsx-extensions-search-bar.d.ts.map