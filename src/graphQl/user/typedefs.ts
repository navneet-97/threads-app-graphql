export const typeDefs = `
    type User {
        id: ID!
        firstName: String!
        lastName: String
        profileImageURL: String
        email: String!
    }

    input CreateUserInput {
        firstName: String!
        lastName: String
        email: String!
        password: String!
    }
`