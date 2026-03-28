export const mutations = `
    createUser(input: CreateUserInput!): String
    createThread(input: CreateThreadInput!): String
    toggleLike(threadId:ID!): Boolean!
`