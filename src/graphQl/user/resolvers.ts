import UserService, { type CreateUserPayload, type GetUserTokenPayload } from "../../services/user.js"

export const resolvers = {
    queries: {
        getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
            if (context && context.id) {
                const user = await UserService.getUserById(context.id)
                return user;
            } else {
                throw new Error('Wrong JWT Token')
            }
        },
        getUserToken: async (_: any, payload: { email: string, password: string }) => {
            const token = await UserService.getUserToken(payload);
            return token;
        }
    },
    mutations: {
        createUser: async (_: any, { input }: { input: CreateUserPayload }) => {
            const res = await UserService.createUser(input)
            return res.id;
        }
    }
}