import { type CreateUserPayload } from "../../services/user.js";
export declare const resolvers: {
    queries: {
        getCurrentLoggedInUser: (_: any, parameters: any, context: any) => Promise<{
            id: string;
            email: string;
            firstName: string;
            lastName: string | null;
            profileImageURL: string | null;
            password: string;
            salt: string;
        } | null>;
        getUserToken: (_: any, payload: {
            email: string;
            password: string;
        }) => Promise<string>;
    };
    mutations: {
        createUser: (_: any, { input }: {
            input: CreateUserPayload;
        }) => Promise<string>;
    };
};
//# sourceMappingURL=resolvers.d.ts.map