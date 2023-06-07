import * as theia from '@theia/plugin';
import { Event, Emitter } from '@theia/core/lib/common/event';
import { RPCProtocol } from '../../common/rpc-protocol';
import { LanguagesMain } from '../../common/plugin-api-rpc';
import { URI } from '@theia/core/shared/vscode-uri';
export declare class DiagnosticCollection implements theia.DiagnosticCollection {
    private static DIAGNOSTICS_PRIORITY;
    private collectionName;
    private diagnosticsLimitPerResource;
    private proxy;
    private onDidChangeDiagnosticsEmitter;
    private diagnostics;
    private isDisposed;
    private onDisposeCallback;
    constructor(name: string, maxCountPerFile: number, proxy: LanguagesMain, onDidChangeDiagnosticsEmitter: Emitter<theia.DiagnosticChangeEvent>);
    get name(): string;
    set(uri: theia.Uri, diagnostics: theia.Diagnostic[] | undefined): void;
    set(entries: [theia.Uri, theia.Diagnostic[] | undefined][]): void;
    private setDiagnosticsForUri;
    private setDiagnostics;
    delete(uri: URI): void;
    clear(): void;
    forEach(callback: (uri: URI, diagnostics: theia.Diagnostic[], collection: theia.DiagnosticCollection) => any, thisArg?: any): void;
    get(uri: URI): theia.Diagnostic[] | undefined;
    has(uri: URI): boolean;
    dispose(): void;
    setOnDisposeCallback(onDisposeCallback: (() => void) | undefined): void;
    private ensureNotDisposed;
    private getAllResourcesUris;
    private getDiagnosticsByUri;
    private fireDiagnosticChangeEvent;
    private toUrisArray;
    private sendChangesToEditor;
}
export declare class Diagnostics {
    static MAX_DIAGNOSTICS_PER_FILE: number;
    private static GENERATED_DIAGNOSTIC_COLLECTION_NAME_PREFIX;
    private proxy;
    private diagnosticCollections;
    private diagnosticsChangedEmitter;
    readonly onDidChangeDiagnostics: Event<theia.DiagnosticChangeEvent>;
    constructor(rpc: RPCProtocol);
    getDiagnostics(resource: theia.Uri): theia.Diagnostic[];
    getDiagnostics(): [theia.Uri, theia.Diagnostic[]][];
    createDiagnosticCollection(name?: string): theia.DiagnosticCollection;
    private getNextId;
    private getAllDiagnosticsForResource;
    private getAllDiagnostics;
}
//# sourceMappingURL=diagnostics.d.ts.map