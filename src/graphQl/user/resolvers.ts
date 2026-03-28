import UserService, { type CreateUserPayload, type CreateThreadPayload } from "../../services/user.js"

export const resolvers = {
    threads: {
        createdBy: async (parent: any) => {
            return await UserService.getUserById(parent.createdById)
        },
        likesCount: async (parent: any) => {
            return await UserService.getLikesCount(parent.id);
        },
        isLiked: async (parent: any, _: any, user: any) => {
            if (!user) return new Error("Unauthorized");
            const like = await UserService.checkCurrentUserLikeOnThread(user.id, parent.id);
            return !!like
        }
    },

    queries: {
        getCurrentLoggedInUser: async (_: any, parameters: any, user: any) => {
            if (!user) throw new Error('Unauthorized');
            return await UserService.getUserById(user.id);
        },

        getUserToken: async (_: any, payload: { email: string, password: string }) => {
            const token = await UserService.getUserToken(payload);
            return token;
        },

        getAllThreads: async () => {
            return await UserService.getAllThreads();
        },

        getLoggedInUserThreads: async (_: any, parameters: any, user: any) => {
            if (!user) throw new Error('Unauthorized');
            return await UserService.getAllThreadsByUserId(user.id)

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

        createThread: async (_: any, { input }: { input: CreateThreadPayload }, user: any) => {
            if (!user) throw new Error('Unauthorized');
            const res = await UserService.createThread({ ...input, createdById: user.id })
            return res.id;
        },

        toggleLike: async (_: any, { threadId }: any, user: any) => {
            if (!user || !user.id) throw new Error("Unauthorized")
            const existing = await UserService.checkCurrentUserLikeOnThread(user.id, threadId)
            if (existing) {
                await UserService.deleteLike(user.id, threadId)
                return false
            } else {
                await UserService.createLike(user.id, threadId)
                return true
            }
        }
    }
}