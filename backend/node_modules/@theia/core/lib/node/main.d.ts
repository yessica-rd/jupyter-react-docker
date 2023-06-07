/// <reference types="node" />
import * as http from 'http';
import * as https from 'https';
import { MaybePromise } from '../common/types';
export interface Address {
    readonly port: number;
    readonly address: string;
}
export declare function start(serverModule: MaybePromise<http.Server | https.Server>): Promise<Address>;
export default start;
//# sourceMappingURL=main.d.ts.map