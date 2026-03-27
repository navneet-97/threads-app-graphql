import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import User from './user/index.js'
import UserService from '../services/user.js'

export async function createGraphQlApolloServer() {
    const server = new ApolloServer({
        typeDefs: `
            ${User.typeDefs}
            type Query {
                ${User.queries}
            }
            type Mutation {
                ${User.mutations}
            }
        `,
        resolvers: {
            Thread: {
                ...User.resolvers.threads
            },
            Query: {
                ...User.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.mutations
            }
        },
    })

    const { url } = await startStandaloneServer(server, {
        context: async ({ req, res }) => {
            const token = req.headers.authorization;
            return await UserService.decodeJWTToken(token);
        }, listen: { port: 8000 }
    })
    return url;
}