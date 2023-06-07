import { ColorTheme, CssStyleCollector, FrontendApplicationContribution, PreferenceSchemaProvider, QuickAccessRegistry, StylingParticipant } from '@theia/core/lib/browser';
import { MonacoSnippetSuggestProvider } from './monaco-snippet-suggest-provider';
import { MonacoEditorService } from './monaco-editor-service';
import { MonacoTextModelService } from './monaco-text-model-service';
import { ContextKeyService as VSCodeContextKeyService } from '@theia/monaco-editor-core/esm/vs/platform/contextkey/browser/contextKeyService';
import { MonacoContextMenuService } from './monaco-context-menu';
import { MonacoThemingService } from './monaco-theming-service';
export declare class MonacoFrontendApplicationContribution implements FrontendApplicationContribution, StylingParticipant {
    protected readonly codeEditorService: MonacoEditorService;
    protected readonly textModelService: MonacoTextModelService;
    protected readonly contextKeyService: VSCodeContextKeyService;
    protected readonly snippetSuggestProvider: MonacoSnippetSuggestProvider;
    protected readonly preferenceSchema: PreferenceSchemaProvider;
    protected readonly quickAccessRegistry: QuickAccessRegistry;
    protected readonly contextMenuService: MonacoContextMenuService;
    protected readonly monacoThemingService: MonacoThemingService;
    protected init(): void;
    initialize(): void;
    registerThemeStyle(theme: ColorTheme, collector: CssStyleCollector): void;
    /**
     * For reasons that are unclear, while most preferences that apply in editors are validated, a few are not.
     * There is a utility in `examples/api-samples/src/browser/monaco-editor-preferences/monaco-editor-preference-extractor.ts` to help determine which are not.
     * Check `src/vs/editor/common/config/editorOptions.ts` for constructor arguments and to make sure that the preference names used to extract constructors are still accurate.
     */
    protected addAdditionalPreferenceValidations(): void;
}
//# sourceMappingURL=monaco-frontend-application-contribution.d.ts.map