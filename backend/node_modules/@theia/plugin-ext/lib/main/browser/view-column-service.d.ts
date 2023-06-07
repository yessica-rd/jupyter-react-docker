import { Emitter, Event } from '@theia/core/lib/common/event';
import { ApplicationShell } from '@theia/core/lib/browser/shell/application-shell';
import { TabBar, Widget } from '@theia/core/shared/@phosphor/widgets';
export declare class ViewColumnService {
    private readonly shell;
    private readonly columnValues;
    private readonly viewColumnIds;
    protected readonly onViewColumnChangedEmitter: Emitter<{
        id: string;
        viewColumn: number;
    }>;
    constructor(shell: ApplicationShell);
    get onViewColumnChanged(): Event<{
        id: string;
        viewColumn: number;
    }>;
    updateViewColumns(): void;
    protected setViewColumn(tabBar: TabBar<Widget>, viewColumn: number): void;
    getViewColumnIds(viewColumn: number): string[];
    getViewColumn(id: string): number | undefined;
    hasViewColumn(id: string): boolean;
    viewColumnsSize(): number;
}
//# sourceMappingURL=view-column-service.d.ts.map