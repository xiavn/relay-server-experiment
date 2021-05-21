import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MutationResolvers } from 'src/generated/graphql';
import { APP_SECRET, getUserId } from 'src/utils';

const mutationResolvers: MutationResolvers = {
    vote: async (parent, args, context, info) => {
        const { userId } = context;
        const vote = await context.prisma.vote.findUnique({
            where: {
                linkId_userId: {
                    linkId: Number(args.linkId),
                    userId: Number(userId),
                },
            },
        });
        if (Boolean(vote)) {
            throw new Error(`Already voted for link: ${args.linkId}`);
        }
        const newVote = context.prisma.vote.create({
            data: {
                user: { connect: { id: Number(userId) } },
                link: { connect: { id: Number(args.linkId) } },
            },
        });
        context.pubsub.publish('NEW_VOTE', newVote);
        return newVote;
    },
};

export default mutationResolvers;
