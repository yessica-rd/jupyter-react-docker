import { ChordKeybinding, KeybindingModifier, ResolvedKeybinding, ResolvedKeybindingPart, ScanCodeBinding, SimpleKeybinding } from '@theia/monaco-editor-core/esm/vs/base/common/keybindings';
import { KeybindingRegistry } from '@theia/core/lib/browser/keybinding';
import { KeyCode, KeySequence } from '@theia/core/lib/browser/keys';
export declare class MonacoResolvedKeybinding extends ResolvedKeybinding {
    protected readonly keySequence: KeySequence;
    protected readonly parts: ResolvedKeybindingPart[];
    constructor(keySequence: KeySequence, keybindingService: KeybindingRegistry);
    getLabel(): string | null;
    getAriaLabel(): string | null;
    getElectronAccelerator(): string | null;
    getUserSettingsLabel(): string | null;
    isWYSIWYG(): boolean;
    isChord(): boolean;
    getDispatchParts(): (string | null)[];
    getSingleModifierDispatchParts(): (KeybindingModifier | null)[];
    protected getSingleModifierDispatchPart(code: KeyCode): KeybindingModifier | null;
    private toKeybinding;
    getParts(): ResolvedKeybindingPart[];
    static toKeybinding(keybindings: Array<SimpleKeybinding | ScanCodeBinding>): string;
    static keyCode(keybinding: SimpleKeybinding | ScanCodeBinding): KeyCode;
    static keySequence(keybinding: ChordKeybinding): KeySequence;
    private static monaco2BrowserKeyCode;
}
//# sourceMappingURL=monaco-resolved-keybinding.d.ts.map