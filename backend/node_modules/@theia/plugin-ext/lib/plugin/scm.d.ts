import * as theia from '@theia/plugin';
import { Event } from '@theia/core/lib/common/event';
import { Plugin, ScmExt, ScmMain } from '../common';
import { CommandRegistryImpl } from '../plugin/command-registry';
import { UriComponents } from '../common/uri-components';
import { RPCProtocol } from '../common/rpc-protocol';
interface ValidateInput {
    (value: string, cursorPosition: number): theia.ProviderResult<theia.SourceControlInputBoxValidation | undefined | null>;
}
export declare class ScmInputBoxImpl implements theia.SourceControlInputBox {
    private plugin;
    private proxy;
    private sourceControlHandle;
    private _value;
    get value(): string;
    set value(value: string);
    private readonly onDidChangeEmitter;
    get onDidChange(): Event<string>;
    private _placeholder;
    get placeholder(): string;
    set placeholder(placeholder: string);
    private _visible;
    get visible(): boolean;
    set visible(visible: boolean);
    private _enabled;
    get enabled(): boolean;
    set enabled(enabled: boolean);
    private _validateInput;
    get validateInput(): ValidateInput | undefined;
    set validateInput(fn: ValidateInput | undefined);
    constructor(plugin: Plugin, proxy: ScmMain, sourceControlHandle: number);
    onInputBoxValueChange(value: string): void;
    private updateValue;
}
export declare class ScmExtImpl implements ScmExt {
    private commands;
    private static handlePool;
    private proxy;
    private sourceControls;
    private sourceControlsByExtension;
    private readonly onDidChangeActiveProviderEmitter;
    get onDidChangeActiveProvider(): Event<theia.SourceControl>;
    private selectedSourceControlHandle;
    constructor(rpc: RPCProtocol, commands: CommandRegistryImpl);
    createSourceControl(extension: Plugin, id: string, label: string, rootUri: theia.Uri | undefined): theia.SourceControl;
    getLastInputBox(extension: Plugin): ScmInputBoxImpl | undefined;
    $provideOriginalResource(sourceControlHandle: number, uriComponents: string, token: theia.CancellationToken): Promise<UriComponents | undefined>;
    $onInputBoxValueChange(sourceControlHandle: number, value: string): Promise<void>;
    $executeResourceCommand(sourceControlHandle: number, groupHandle: number, handle: number): Promise<void>;
    $validateInput(sourceControlHandle: number, value: string, cursorPosition: number): Promise<[string, number] | undefined>;
    $setSelectedSourceControl(selectedSourceControlHandle: number | undefined): Promise<void>;
}
export {};
//# sourceMappingURL=scm.d.ts.map