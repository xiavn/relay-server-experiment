import { QueryResolvers } from "../generated/graphql";

const queryResolvers: QueryResolvers = {
    info: () => "This is a string",
    feed: async (parent, args, context) => {
        const where = args.filter
            ? {
                  OR: [
                      { description: { contains: args.filter } },
                      { url: { contains: args.filter } },
                  ],
              }
            : {};
        return await context.prisma.link.findMany({ where });
    },
    link: async (parent, args, context) =>
        await context.prisma.link.findUnique({
            where: {
                id: Number(args.id),
            },
        }),
};

export default queryResolvers;
