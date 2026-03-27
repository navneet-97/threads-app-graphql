declare const _default: {
    resolvers: {
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
                input: import("../../services/user.js").CreateUserPayload;
            }) => Promise<string>;
        };
    };
    mutations: string;
    queries: string;
    typeDefs: string;
};
export default _default;
//# sourceMappingURL=index.d.ts.map