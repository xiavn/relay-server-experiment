import { ApolloServer, PubSub } from "apollo-server";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import Query from "src/resolvers/Query";
import Mutation from "src/resolvers/Mutation";
import Link from "src/resolvers/Link";
import User from "src/resolvers/User";
import Subscription from "src/resolvers/Subscription";
import { getUserId } from "./utils";

const prisma = new PrismaClient();
const pubsub = new PubSub();

export type Context = {
    prisma: typeof prisma;
    pubsub: typeof pubsub;
    userId: string | null;
};

const resolvers = {
    Query,
    Mutation,
    Link,
    User,
    Subscription,
};

const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
    resolvers,
    context: ({ req }) => ({
        ...req,
        prisma,
        pubsub,
        userId:
            req && req.headers.authorization
                ? getUserId(req.headers.authorization)
                : null,
    }),
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
