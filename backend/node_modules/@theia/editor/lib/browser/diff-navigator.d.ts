import { TextEditor } from './editor';
export interface DiffNavigator {
    canNavigate(): boolean;
    hasNext(): boolean;
    hasPrevious(): boolean;
    next(): void;
    previous(): void;
}
export declare const DiffNavigatorProvider: unique symbol;
export declare type DiffNavigatorProvider = (editor: TextEditor) => DiffNavigator;
//# sourceMappingURL=diff-navigator.d.ts.map