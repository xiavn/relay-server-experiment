import { ApolloServer } from "apollo-server";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { Resolvers } from "./generated/graphql";

const prisma = new PrismaClient();

export type Context = {
    prisma: typeof prisma;
};

const resolvers: Resolvers = {
    Query: {
        info: () => "This is a string",
        feed: async (parent, args, context) => {
            return await context.prisma.link.findMany();
        },
        link: (parent, args, context) =>
            context.prisma.link.findUnique({
                where: {
                    id: Number(args.id),
                },
            }),
    },
    Mutation: {
        post: (parent, args, context, info) => {
            const newLink = context.prisma.link.create({
                data: {
                    description: args.description,
                    url: args.url,
                },
            });
            return newLink;
        },
        updateLink: (parent, args, context) => {
            const id = Number(args.id);
            const link = context.prisma.link.update({
                where: {
                    id,
                },
                data: {
                    ...args,
                    id,
                },
            });
            return link;
        },
        deleteLink: (parent, args, context) => {
            const id = Number(args.id);
            const removed = context.prisma.link.delete({
                where: {
                    id,
                },
            });
            return removed;
        },
    },
};

const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
    resolvers,
    context: { prisma },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
