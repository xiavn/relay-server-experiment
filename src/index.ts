import { ApolloServer } from "apollo-server";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import Query from "src/resolvers/Query";
import Mutation from "src/resolvers/Mutation";
import { getUserId } from "./utils";

const prisma = new PrismaClient();

export type Context = {
    prisma: typeof prisma;
    userId: string | null;
};

const resolvers = {
    Query,
    Mutation,
};

const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
    resolvers,
    context: ({ req }) => ({
        ...req,
        prisma,
        userId:
            req && req.headers.authorization
                ? getUserId(req.headers.authorization)
                : null,
    }),
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
