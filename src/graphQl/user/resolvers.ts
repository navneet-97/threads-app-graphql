import UserService, { type CreateUserPayload, type CreateThreadPayload } from "../../services/user.js"

export const resolvers = {
    threads: {
        createdBy: async (parent: any) => {
            return await UserService.getUserById(parent.createdById)
        }
    },

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
        },

        getAllThreads: async () => {
            return await UserService.getAllThreads();
        },

        getLoggedInUserThreads: async (_: any, parameters: any, context: any) => {
            if (context && context.id) {
                return await UserService.getAllThreadsByUserId(context.id)
            } else {
                throw new Error('Login First')
            }
        },

        getAllUsers: async () => {
            return await UserService.getAllUsers();
        },

        getUserById: async (_: any, { id }: { id: string }) => {
            return await UserService.getUserById(id)
        }
    },

    mutations: {
        createUser: async (_: any, { input }: { input: CreateUserPayload }) => {
            const res = await UserService.createUser(input)
            return res.id;
        },
        createThread: async (_: any, { input }: { input: CreateThreadPayload }, context: any) => {
            if (context && context.id) {
                const res = await UserService.createThread({ ...input, createdById: context.id })
                return res.id;
            }
        }
    }
}