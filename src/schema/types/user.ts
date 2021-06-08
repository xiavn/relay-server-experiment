import { objectType } from 'nexus';
import { getLinksForUser } from '../model';
import { createConnection } from '../model/pagination';
import { Link } from '../source-types';

export const userType = objectType({
    name: 'User',
    definition(t) {
        t.implements('Node');
        t.nonNull.string('name');
        t.nonNull.string('email');
        t.nonNull.connectionField('links', {
            type: 'Link',
            extendConnection(t) {
                t.field('pageCursors', {
                    type: 'PageCursors',
                });
            },
            resolve: async (source, args, ctx) => {
                const data = await getLinksForUser(source.id, ctx.prisma);
                return createConnection<Link>(args, data);
            },
        });
        // t.nonNull.list.nonNull.field('links', {
        //     type: 'Link',
        //     resolve: async (source, args, ctx) => {
        //         return await getLinksForUser(source.id, ctx.prisma);
        //     },
        // });
    },
});
