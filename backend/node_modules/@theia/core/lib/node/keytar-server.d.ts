import { KeytarService } from '../common/keytar-protocol';
export declare class KeytarServiceImpl implements KeytarService {
    private static readonly MAX_PASSWORD_LENGTH;
    private static readonly PASSWORD_CHUNK_SIZE;
    setPassword(service: string, account: string, password: string): Promise<void>;
    deletePassword(service: string, account: string): Promise<boolean>;
    getPassword(service: string, account: string): Promise<string | undefined>;
    findPassword(service: string): Promise<string | undefined>;
    findCredentials(service: string): Promise<Array<{
        account: string;
        password: string;
    }>>;
}
//# sourceMappingURL=keytar-server.d.ts.map