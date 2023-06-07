import { QuickInputService } from '@theia/core/lib/browser';
import * as PQueue from 'p-queue';
import { GitPrompt } from '../../common/git-prompt';
export declare class GitQuickOpenPrompt extends GitPrompt {
    protected readonly quickInputService: QuickInputService;
    protected readonly queue: PQueue<PQueue.DefaultAddOptions>;
    ask(question: GitPrompt.Question): Promise<GitPrompt.Answer>;
    dispose(): void;
}
//# sourceMappingURL=git-quick-open-prompt.d.ts.map