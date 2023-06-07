import { CommandRegistry, CommandContribution } from '@theia/core/lib/common';
import { ApplicationShell } from '@theia/core/lib/browser';
export declare class CustomEditorContribution implements CommandContribution {
    protected readonly shell: ApplicationShell;
    registerCommands(commands: CommandRegistry): void;
}
//# sourceMappingURL=custom-editor-contribution.d.ts.map