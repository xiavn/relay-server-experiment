import { extendType, intArg, nonNull, objectType } from 'nexus';
import { createNewVote, getLinkForVote, getUserForVote } from '../model/vote';
import { Vote } from '../source-types';

const subscriptionLabels = {
    newVote: 'NEW_VOTE',
};

export const voteType = objectType({
    name: 'Vote',
    definition(t) {
        t.implements('Node');
        t.field('link', {
            type: 'Link',
            resolve: async (source, _args, ctx) => {
                return await getLinkForVote(source.id, ctx.prisma);
            },
        });
        t.field('user', {
            type: 'User',
            resolve: async (root, _args, ctx) => {
                return await getUserForVote(root.id, ctx.prisma);
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
                const userId = ctx.userId;
                const linkId = Number(args.linkId);
                if (userId === null) {
                    throw new Error(`User needs to be signed in to vote`);
                }
                const newVote = await createNewVote(
                    { userId, linkId },
                    ctx.prisma,
                );
                ctx.pubsub.publish(subscriptionLabels.newVote, newVote);
                return newVote;
            },
        });
    },
});

export const voteSubscription = extendType({
    type: 'Subscription',
    definition(t) {
        t.field('newVote', {
            type: 'Vote',
            subscribe(_root, _args, ctx) {
                return ctx.pubsub.asyncIterator(subscriptionLabels.newVote);
            },
            resolve(eventData: Vote) {
                return eventData;
            },
        });
    },
});
