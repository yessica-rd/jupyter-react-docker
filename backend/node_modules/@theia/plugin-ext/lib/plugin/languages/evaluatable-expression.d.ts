import { URI } from '@theia/core/shared/vscode-uri';
import * as theia from '@theia/plugin';
import { Position } from '../../common/plugin-api-rpc';
import { EvaluatableExpression } from '../../common/plugin-api-rpc-model';
import { DocumentsExtImpl } from '../documents';
export declare class EvaluatableExpressionAdapter {
    private readonly provider;
    private readonly documents;
    constructor(provider: theia.EvaluatableExpressionProvider, documents: DocumentsExtImpl);
    provideEvaluatableExpression(resource: URI, position: Position, token: theia.CancellationToken): Promise<EvaluatableExpression | undefined>;
}
//# sourceMappingURL=evaluatable-expression.d.ts.map