import URI from '@theia/core/lib/common/uri';
/**
 * Static methods for identifying a plugin as the target of the VSCode deployment system.
 * In practice, this means that it will be resolved and deployed by the Open-VSX system.
 */
export declare namespace VSCodeExtensionUri {
    const VSCODE_PREFIX = "vscode:extension/";
    /**
     * Should be used to prefix a plugin's ID to ensure that it is identified as a VSX Extension.
     * @returns `vscode:extension/${id}`
     */
    function toVsxExtensionUriString(id: string): string;
    function toUri(name: string, namespace: string): URI;
    function toUri(id: string): URI;
    function toId(uri: URI): string | undefined;
}
//# sourceMappingURL=plugin-vscode-uri.d.ts.map