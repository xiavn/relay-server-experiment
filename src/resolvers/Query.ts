import { QueryResolvers } from "../generated/graphql";

const queryResolvers: QueryResolvers = {
    info: () => "This is a string",
    feed: async (parent, args, context) => {
        return await context.prisma.link.findMany();
    },
    link: async (parent, args, context) =>
        await context.prisma.link.findUnique({
            where: {
                id: Number(args.id),
            },
        }),
};

export default queryResolvers;
