/// <reference types="node" />
import * as http from 'http';
import { WsRequestValidatorContribution } from '../../node/ws-request-validators';
export declare class ElectronWsOriginValidator implements WsRequestValidatorContribution {
    allowWsUpgrade(request: http.IncomingMessage): boolean;
}
//# sourceMappingURL=electron-ws-origin-validator.d.ts.map