/// <reference types="node" />
import * as http from 'http';
import * as https from 'https';
import * as express from 'express';
import * as yargs from 'yargs';
import { ContributionProvider, MaybePromise, Stopwatch } from '../common';
import { CliContribution } from './cli';
import { ApplicationPackage } from '@theia/application-package';
import { ProcessUtils } from './process-utils';
export declare const BackendApplicationServer: unique symbol;
/**
 * This service is responsible for serving the frontend files.
 *
 * When not bound, `@theia/cli` generators will bind it on the fly to serve files according to its own layout.
 */
export interface BackendApplicationServer extends BackendApplicationContribution {
}
export declare const BackendApplicationContribution: unique symbol;
/**
 * Contribution for hooking into the backend lifecycle.
 */
export interface BackendApplicationContribution {
    /**
     * Called during the initialization of the backend application.
     * Use this for functionality which has to run as early as possible.
     *
     * The implementation may be async, however it will still block the
     * initialization step until it's resolved.
     *
     * @returns either `undefined` or a Promise resolving to `undefined`.
     */
    initialize?(): MaybePromise<void>;
    /**
     * Called after the initialization of the backend application is complete.
     * Use this to configure the Express app before it is started, for example
     * to offer additional endpoints.
     *
     * The implementation may be async, however it will still block the
     * configuration step until it's resolved.
     *
     * @param app the express application to configure.
     *
     * @returns either `undefined` or a Promise resolving to `undefined`.
     */
    configure?(app: express.Application): MaybePromise<void>;
    /**
     * Called right after the server for the Express app is started.
     * Use this to additionally configure the server or as ready-signal for your service.
     *
     * The implementation may be async, however it will still block the
     * startup step until it's resolved.
     *
     * @param server the backend server running the express app.
     *
     * @returns either `undefined` or a Promise resolving to `undefined`.
     */
    onStart?(server: http.Server | https.Server): MaybePromise<void>;
    /**
     * Called when the backend application shuts down. Contributions must perform only synchronous operations.
     * Any kind of additional asynchronous work queued in the event loop will be ignored and abandoned.
     *
     * @param app the express application.
     */
    onStop?(app?: express.Application): void;
}
export declare class BackendApplicationCliContribution implements CliContribution {
    port: number;
    hostname: string | undefined;
    ssl: boolean | undefined;
    cert: string | undefined;
    certkey: string | undefined;
    projectPath: string;
    configure(conf: yargs.Argv): void;
    setArguments(args: yargs.Arguments): void;
    protected appProjectPath(): string;
}
/**
 * The main entry point for Theia applications.
 */
export declare class BackendApplication {
    protected readonly contributionsProvider: ContributionProvider<BackendApplicationContribution>;
    protected readonly cliParams: BackendApplicationCliContribution;
    protected readonly app: express.Application;
    protected readonly applicationPackage: ApplicationPackage;
    protected readonly processUtils: ProcessUtils;
    protected readonly stopwatch: Stopwatch;
    constructor(contributionsProvider: ContributionProvider<BackendApplicationContribution>, cliParams: BackendApplicationCliContribution);
    protected initialize(): Promise<void>;
    protected configure(): Promise<void>;
    use(...handlers: express.Handler[]): void;
    start(aPort?: number, aHostname?: string): Promise<http.Server | https.Server>;
    protected onStop(): void;
    protected serveGzipped(contentType: string, req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>;
    protected measure<T>(name: string, fn: () => MaybePromise<T>): Promise<T>;
    protected handleUncaughtError(error: Error): void;
}
//# sourceMappingURL=backend-application.d.ts.map