export const queries = `
    getCurrentLoggedInUser: User
    getUserToken(email:String!, password:String!):String
    getAllThreads: [Thread]
    getLoggedInUserThreads: [Thread]
    getAllUsers: [User]
    getUserById(id: ID!): User
`