import type Client from "pocketbase";
import PocketBase from "pocketbase";
export declare class AuthorizedPocketBase {
    static instance: AuthorizedPocketBase;
    _pb: PocketBase;
    createdAt: Date;
    constructor();
    authorizeWithAdminEmailAndPassword(email: string, password: string): Promise<this>;
    authorize(): Promise<this>;
    _getAdminEmailVars: () => {
        PB_USERNAME: any;
        PB_PASSWORD: any;
    };
    get _authMethod(): any;
    get _pbUrl(): any;
    get pb(): Client;
}
export declare const authPb: Client;
//# sourceMappingURL=index.d.ts.map