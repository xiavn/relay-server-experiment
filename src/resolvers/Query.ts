import { QueryResolvers } from '../generated/graphql';

const queryResolvers: QueryResolvers = {
    info: () => 'This is a string',
    feed: async (parent, args, context) => {
        const where = args.filter
            ? {
                  OR: [
                      { description: { contains: args.filter } },
                      { url: { contains: args.filter } },
                  ],
              }
            : {};
        const links = await context.prisma.link.findMany({
            where,
            skip: args.skip !== null ? args.skip : undefined,
            take: args.take !== null ? args.take : undefined,
            orderBy: args.orderBy
                ? { [args.orderBy.parameter]: args.orderBy.direction }
                : undefined,
        });
        const count = await context.prisma.link.count({ where });
        return {
            links,
            count,
        };
    },
    link: async (parent, args, context) =>
        await context.prisma.link.findUnique({
            where: {
                id: Number(args.id),
            },
        }),
};

export default queryResolvers;
