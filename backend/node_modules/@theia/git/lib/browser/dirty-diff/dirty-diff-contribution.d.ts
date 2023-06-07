import { DirtyDiffDecorator } from '@theia/scm/lib/browser/dirty-diff/dirty-diff-decorator';
import { FrontendApplicationContribution, FrontendApplication } from '@theia/core/lib/browser';
import { DirtyDiffManager } from './dirty-diff-manager';
export declare class DirtyDiffContribution implements FrontendApplicationContribution {
    protected readonly dirtyDiffManager: DirtyDiffManager;
    protected readonly dirtyDiffDecorator: DirtyDiffDecorator;
    constructor(dirtyDiffManager: DirtyDiffManager, dirtyDiffDecorator: DirtyDiffDecorator);
    onStart(app: FrontendApplication): void;
}
//# sourceMappingURL=dirty-diff-contribution.d.ts.map