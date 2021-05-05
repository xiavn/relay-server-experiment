import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { MutationResolvers } from "src/generated/graphql";

const mutationResolvers: MutationResolvers = {
    post: async (parent, args, context, info) => {
        const { userId } = context;
        return await context.prisma.link.create({
            data: {
                description: args.description,
                url: args.url,
                postedBy: { connect: { id: Number(userId) } },
            },
        });
    },
    updateLink: (parent, args, context) => {
        const id = Number(args.id);
        const link = context.prisma.link.update({
            where: {
                id,
            },
            data: {
                ...args,
                id,
            },
        });
        return link;
    },
    deleteLink: (parent, args, context) => {
        const id = Number(args.id);
        const removed = context.prisma.link.delete({
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
};

export default mutationResolvers;
