import { CancellationToken } from '@theia/core/lib/common/cancellation';
import type * as theia from '@theia/plugin';
export declare const createRunProfile: (label: string, kind: theia.TestRunProfileKind, runHandler: (request: theia.TestRunRequest, token: CancellationToken) => Thenable<void> | void, isDefault?: boolean | undefined, tag?: theia.TestTag | undefined, supportsContinuousRun?: boolean | undefined) => {
    label: string;
    kind: theia.TestRunProfileKind;
    isDefault: boolean;
    tag: theia.TestTag | undefined;
    supportsContinuousRun: boolean;
    runHandler: (request: theia.TestRunRequest, token: CancellationToken) => Thenable<void> | void;
    configureHandler: undefined;
    dispose: () => undefined;
};
export declare const createTestRun: (request: theia.TestRunRequest, name?: string | undefined, persist?: boolean | undefined) => theia.TestRun;
export declare const testItemCollection: {
    add: () => void;
    delete: () => void;
    forEach: () => void;
    [Symbol.iterator](): Generator<never, void, unknown>;
    get: () => undefined;
    replace: () => void;
    size: number;
};
export declare const createTestItem: (id: string, label: string, uri?: theia.Uri | undefined) => theia.TestItem;
//# sourceMappingURL=tests-api.d.ts.map