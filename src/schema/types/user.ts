import { objectType } from 'nexus';
import { getLinksForUser } from '../model';

export const userType = objectType({
    name: 'User',
    definition(t) {
        t.implements('Node');
        t.nonNull.string('name');
        t.nonNull.string('email');
        t.nonNull.list.nonNull.field('links', {
            type: 'Link',
            resolve: async (source, args, ctx) => {
                return await getLinksForUser(source.id, ctx.prisma);
            },
        });
    },
});
