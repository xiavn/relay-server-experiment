import { extendType, intArg, nonNull, objectType } from 'nexus';

export const voteType = objectType({
    name: 'Vote',
    definition(t) {
        t.nonNull.int('id'),
            t.field('link', {
                type: 'Link',
                resolve: async (root, _args, ctx) => {
                    return await ctx.prisma.vote
                        .findUnique({
                            where: { id: root.id },
                        })
                        .link();
                },
            });
        t.field('user', {
            type: 'User',
            resolve: async (root, _args, ctx) => {
                return await ctx.prisma.vote
                    .findUnique({
                        where: { id: root.id },
                    })
                    .user();
            },
        });
    },
});

export const voteMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('addVote', {
            type: 'Vote',
            args: {
                linkId: nonNull(intArg()),
            },
            resolve: async (_root, args, ctx) => {
                const { userId } = ctx;
                const vote = await ctx.prisma.vote.findUnique({
                    where: {
                        linkId_userId: {
                            linkId: args.linkId,
                            userId: Number(userId),
                        },
                    },
                });
                if (Boolean(vote)) {
                    throw new Error(`Already voted for link: ${args.linkId}`);
                }
                const newVote = ctx.prisma.vote.create({
                    data: {
                        user: { connect: { id: Number(userId) } },
                        link: { connect: { id: args.linkId } },
                    },
                });
                ctx.pubsub.publish('NEW_VOTE', newVote);
                return newVote;
            },
        });
    },
});
