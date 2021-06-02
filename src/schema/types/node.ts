import { fromGlobalId, toGlobalId } from 'graphql-relay';
import { extendType, idArg, interfaceType, nonNull } from 'nexus';
import { getUser } from '../model';

export const Node = interfaceType({
    name: 'Node',
    definition(t) {
        t.nonNull.id('id', {
            resolve(source) {
                const id = toGlobalId(source.__typename, String(source.id));
                return id;
            },
        });
    },
});

export const nodeQuery = extendType({
    type: 'Query',
    definition(t) {
        t.field('node', {
            type: 'Node',
            args: {
                id: nonNull(idArg()),
            },
            resolve: async (source, args, ctx) => {
                const { type, id } = fromGlobalId(args.id);
                switch (type) {
                    case 'Link':
                        const link = await ctx.prisma.link.findUnique({
                            where: {
                                id: Number(id),
                            },
                        });
                        if (link !== null) {
                            return {
                                ...link,
                                __typename: 'Link',
                            };
                        }
                        return null;
                    case 'User':
                        return await getUser(Number(id), ctx.prisma);
                    default:
                        return null;
                }
            },
        });
    },
});
