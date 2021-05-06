import { UserResolvers } from "src/generated/graphql";

const userResolvers: UserResolvers = {
    links: async (parent, args, context) => {
        return await context.prisma.user
            .findUnique({ where: { id: parent.id } })
            .links();
    },
};

export default userResolvers;
