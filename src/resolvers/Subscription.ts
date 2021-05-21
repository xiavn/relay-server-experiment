import { Link, Vote } from '@prisma/client';
import { SubscriptionResolvers } from 'src/generated/graphql';

const subscriptionResolvers: SubscriptionResolvers = {
    newLink: {
        subscribe: async (parent, args, context, info) => {
            return await context.pubsub.asyncIterator('NEW_LINK');
        },
        resolve: (payload: Link) => {
            return payload;
        },
    },
    newVote: {
        subscribe: async (parent, args, context, info) => {
            return await context.pubsub.asyncIterator('NEW_VOTE');
        },
        resolve: (payload: Vote) => {
            return payload;
        },
    },
};

export default subscriptionResolvers;
