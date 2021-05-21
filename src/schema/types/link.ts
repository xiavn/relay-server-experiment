import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

export const linkType = objectType({
    name: "Link",
    definition(t) {
        t.nonNull.int("id"), t.string("description"), t.string("url");
    },
});

export const linkQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.field("feed", {
            type: "Link",
            resolve: async (_root, _args, ctx) => {
                const links = await ctx.prisma.link.findMany();
                return links;
            },
        });
    },
});

export const linkMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createLink", {
            type: "Link",
            args: {
                url: nonNull(stringArg()),
                description: nonNull(stringArg()),
            },
            resolve: async (_root, args, ctx) => {
                const { userId } = ctx;
                const newLink = await ctx.prisma.link.create({
                    data: {
                        description: args.description,
                        url: args.url,
                        postedBy: { connect: { id: Number(userId) } },
                    },
                });
                ctx.pubsub.publish("NEW_LINK", newLink);
                return newLink;
            },
        });
        t.nonNull.field("updateLink", {
            type: "Link",
            args: {
                id: nonNull(intArg()),
                url: stringArg(),
                description: stringArg(),
            },
            resolve: async (_root, args, ctx) => {
                const id = args.id;
                const link = await ctx.prisma.link.update({
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
        });
    },
});
