import { ContentLinesArrayLike } from './content-lines';
export declare class DiffComputer {
    computeDiff(previous: ContentLinesArrayLike, current: ContentLinesArrayLike): DiffResult[];
    computeDirtyDiff(previous: ContentLinesArrayLike, current: ContentLinesArrayLike): DirtyDiff;
}
export interface DiffResult {
    value: [number, number];
    count?: number;
    added?: boolean;
    removed?: boolean;
}
export interface DirtyDiff {
    /**
     * Lines added by comparison to previous revision.
     */
    readonly added: LineRange[];
    /**
     * Lines, after which lines were removed by comparison to previous revision.
     */
    readonly removed: number[];
    /**
     * Lines modified by comparison to previous revision.
     */
    readonly modified: LineRange[];
}
export interface LineRange {
    start: number;
    end: number;
}
//# sourceMappingURL=diff-computer.d.ts.map