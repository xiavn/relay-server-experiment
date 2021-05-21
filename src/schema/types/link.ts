import {
    buildASTSchema,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";
import { globalIdField } from "graphql-relay";
import { extendType, objectType } from "nexus";
import { nodeInterface } from "../node";
import { userType } from "../user";

// const linkType = new GraphQLObjectType({
//     name: "Link",
//     fields: () => ({
//         id: globalIdField(),
//         interfaces: [nodeInterface],
//         description: {
//             type: GraphQLNonNull(GraphQLString),
//         },
//         url: {
//             type: GraphQLNonNull(GraphQLString),
//         },
//         postedBy: {
//             type: userType,
//             resolve: async (parent, args, context) => {
//                 return await context.prisma.link
//                     .findUnique({ where: { id: parent.id } })
//                     .postedBy();
//             },
//         },
//     }),
// });

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
