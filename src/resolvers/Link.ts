import { LinkResolvers } from 'src/generated/graphql';

const linkResolvers: LinkResolvers = {
    postedBy: async (parent, args, context) => {
        return await context.prisma.link
            .findUnique({ where: { id: parent.id } })
            .postedBy();
    },
    votes: async (parent, args, context) => {
        return await context.prisma.link
            .findUnique({ where: { id: parent.id } })
            .votes();
    },
};

export default linkResolvers;
