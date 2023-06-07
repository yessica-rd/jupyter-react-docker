import { LabelProviderContribution } from '@theia/core/lib/browser';
import { Preference } from './preference-types';
import { PreferenceTreeGenerator } from './preference-tree-generator';
export declare class PreferenceTreeLabelProvider implements LabelProviderContribution {
    protected readonly treeGenerator: PreferenceTreeGenerator;
    canHandle(element: object): number;
    getName(node: Preference.TreeNode): string;
    getPrefix(node: Preference.TreeNode, fullPath?: boolean): string | undefined;
    protected formatString(string: string): string;
    protected isUpperCase(char: string): boolean;
}
//# sourceMappingURL=preference-tree-label-provider.d.ts.map