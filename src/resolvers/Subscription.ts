import { Link } from "@prisma/client";
import { SubscriptionResolvers } from "src/generated/graphql";

const subscriptionResolvers: SubscriptionResolvers = {
    newLink: {
        subscribe: async (parent, args, context, info) => {
            return await context.pubsub.asyncIterator("NEW_LINK");
        },
        resolve: (payload: Link) => {
            return payload;
        },
    },
};

export default subscriptionResolvers;
