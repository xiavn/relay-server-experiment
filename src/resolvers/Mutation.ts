import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { MutationResolvers } from "src/generated/graphql";
import { APP_SECRET, getUserId } from "src/utils";

const mutationResolvers: MutationResolvers = {
    deleteLink: async (parent, args, context) => {
        const id = Number(args.id);
        const removed = await context.prisma.link.delete({
            where: {
                id,
            },
        });
        return removed;
    },
    signup: async (parent, args, context, info) => {
        const password = await bcrypt.hash(args.password, 10);
        const user = await context.prisma.user.create({
            data: { ...args, password },
        });
        const token = jwt.sign({ userId: user.id }, APP_SECRET);
        return { token, user };
    },
    login: async (parent, args, context, info) => {
        const user = await context.prisma.user.findUnique({
            where: { email: args.email },
        });
        if (!user) {
            throw new Error("No user found");
        }

        const valid = await bcrypt.compare(args.password, user.password);
        if (!valid) {
            throw new Error("Invalid password");
        }

        const token = jwt.sign({ userId: user.id }, APP_SECRET);

        return {
            token,
            user,
        };
    },
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
        context.pubsub.publish("NEW_VOTE", newVote);
        return newVote;
    },
};

export default mutationResolvers;
