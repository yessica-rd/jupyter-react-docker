import { OpenerService } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { Position } from '@theia/editor/lib/browser';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
import { TerminalWidget } from './base/terminal-widget';
import { TerminalLink, TerminalLinkProvider } from './terminal-link-provider';
export declare class FileLinkProvider implements TerminalLinkProvider {
    protected readonly openerService: OpenerService;
    protected fileService: FileService;
    provideLinks(line: string, terminal: TerminalWidget): Promise<TerminalLink[]>;
    protected createRegExp(): Promise<RegExp>;
    protected isValidFile(match: string, terminal: TerminalWidget): Promise<boolean>;
    protected toURI(match: string, cwd: URI): Promise<URI | undefined>;
    protected getCwd(terminal: TerminalWidget): Promise<URI>;
    protected extractPath(link: string): Promise<string | undefined>;
    open(match: string, terminal: TerminalWidget): Promise<void>;
    protected extractPosition(link: string): Promise<Position>;
}
export declare class FileDiffPreLinkProvider extends FileLinkProvider {
    createRegExp(): Promise<RegExp>;
}
export declare class FileDiffPostLinkProvider extends FileLinkProvider {
    createRegExp(): Promise<RegExp>;
}
//# sourceMappingURL=terminal-file-link-provider.d.ts.map