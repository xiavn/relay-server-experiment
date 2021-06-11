import { fromGlobalId, toGlobalId } from 'graphql-relay';
import { extendType, idArg, interfaceType, nonNull } from 'nexus';
import { NexusGenAbstractTypeMembers } from 'src/nexus-typegen';
import { getUser, getLink, getVote } from '../model';
import { getColour } from '../model/colour';

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
                switch (type as NexusGenAbstractTypeMembers['Node']) {
                    case 'Link':
                        return await getLink(Number(id), ctx.prisma);
                    case 'User':
                        return await getUser(Number(id), ctx.prisma);
                    case 'Vote':
                        return await getVote(Number(id), ctx.prisma);
                    case 'Colour':
                        return await getColour(Number(id));
                    default:
                        return null;
                }
            },
        });
    },
});
