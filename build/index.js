import express from "express";
import { createGraphQlApolloServer } from "./graphQl/index.js";
const PORT = 8000;
async function startServer() {
    const app = express();
    app.use(express.json());
    const url = await createGraphQlApolloServer();
    console.log(`Server is running at PORT:${url}`);
}
startServer();
//# sourceMappingURL=index.js.map