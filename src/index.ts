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
        // link: (id) => links.find((link) => link.id === id),
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
        // updateLink: (parent, args, context) => {
        //     const linkIndex = context.prisma.link.update();
        //     if (linkIndex > -1) {
        //         const updatedLink = {
        //             id: args.id,
        //             url: args.url,
        //             description: args.description,
        //         };
        //         links[linkIndex] = updatedLink;
        //         return updatedLink;
        //     }
        // },
        // deleteLink: (parent, args) => {
        //     const linkIndex = links.findIndex((link) => link.id === args.id);
        //     if (linkIndex > -1) {
        //         links.splice(linkIndex, 1);
        //     }
        // },
    },
};

const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
    resolvers,
    context: { prisma },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
