import { fromGlobalId, toGlobalId } from 'graphql-relay';
import { extendType, idArg, interfaceType, nonNull } from 'nexus';
import { getUser, getLink } from '../model';

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
            resolve: async (_, args, ctx) => {
                const { type, id } = fromGlobalId(args.id);
                switch (type) {
                    case 'Link':
                        return await getLink(Number(id), ctx.prisma);
                    case 'User':
                        return await getUser(Number(id), ctx.prisma);
                    default:
                        return null;
                }
            },
        });
    },
});
