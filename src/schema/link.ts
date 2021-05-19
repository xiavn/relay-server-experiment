import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { globalIdField } from "graphql-relay";
import { nodeInterface } from "./node";
import { userType } from "./user";

const linkType = new GraphQLObjectType({
    name: "Link",
    fields: () => ({
        id: globalIdField(),
        interfaces: [nodeInterface],
        description: {
            type: GraphQLNonNull(GraphQLString),
        },
        url: {
            type: GraphQLNonNull(GraphQLString),
        },
        postedBy: {
            type: userType,
            resolve: async (parent, args, context) => {
                return await context.prisma.link
                    .findUnique({ where: { id: parent.id } })
                    .postedBy();
            },
        },
    }),
});
