import * as theia from '@theia/plugin';
import { SerializedIndentationRule, SerializedOnEnterRule, SerializedRegExp } from '../common';
export declare function serializeEnterRules(rules?: theia.OnEnterRule[]): SerializedOnEnterRule[] | undefined;
export declare function serializeRegExp(regexp?: RegExp): SerializedRegExp | undefined;
export declare function serializeIndentation(indentationRules?: theia.IndentationRule): SerializedIndentationRule | undefined;
//# sourceMappingURL=languages-utils.d.ts.map