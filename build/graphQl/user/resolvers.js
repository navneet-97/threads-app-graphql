import UserService, {} from "../../services/user.js";
export const resolvers = {
    queries: {
        getCurrentLoggedInUser: async (_, parameters, context) => {
            if (context && context.id) {
                const user = await UserService.getUserById(context.id);
                return user;
            }
            else {
                throw new Error('Wrong JWT Token');
            }
        },
        getUserToken: async (_, payload) => {
            const token = await UserService.getUserToken(payload);
            return token;
        }
    },
    mutations: {
        createUser: async (_, { input }) => {
            const res = await UserService.createUser(input);
            return res.id;
        }
    }
};
//# sourceMappingURL=resolvers.js.map