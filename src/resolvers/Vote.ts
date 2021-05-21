import { VoteResolvers } from 'src/generated/graphql';

const voteResolvers: VoteResolvers = {
    link: async (parent, args, context) => {
        return await context.prisma.vote
            .findUnique({ where: { id: parent.id } })
            .link();
    },
    user: async (parent, args, context) => {
        return await context.prisma.vote
            .findUnique({ where: { id: parent.id } })
            .user();
    },
};

export default voteResolvers;
