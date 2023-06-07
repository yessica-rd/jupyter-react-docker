export declare const keytarServicePath = "/services/keytar";
export declare const KeytarService: unique symbol;
export interface KeytarService {
    setPassword(service: string, account: string, password: string): Promise<void>;
    getPassword(service: string, account: string): Promise<string | undefined>;
    deletePassword(service: string, account: string): Promise<boolean>;
    findPassword(service: string): Promise<string | undefined>;
    findCredentials(service: string): Promise<Array<{
        account: string;
        password: string;
    }>>;
}
//# sourceMappingURL=keytar-protocol.d.ts.map