import { LinkResolvers } from 'src/generated/graphql';

const linkResolvers: LinkResolvers = {
    votes: async (parent, args, context) => {
        return await context.prisma.link
            .findUnique({ where: { id: parent.id } })
            .votes();
    },
};

export default linkResolvers;
