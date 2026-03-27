export const typeDefs = `
    type User {
        id: ID!
        firstName: String!
        lastName: String
        profileImageURL: String
        email: String!
    }

    type Thread {
        id: ID!
        title: String!
        content: String!
        createdBy: User!
    }

    input CreateUserInput {
        firstName: String!
        lastName: String
        email: String!
        password: String!
    }

    input CreateThreadInput {
        title: String!
        content: String!
    }
`