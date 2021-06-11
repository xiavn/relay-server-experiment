import { objectType } from 'nexus';
import { getLinksForUser } from '../model';
import { getColour } from '../model/colour';
import { createConnection } from '../model/pagination';
import { Link } from '../source-types';

export const userType = objectType({
    name: 'User',
    definition(t) {
        t.implements('Node');
        t.nonNull.string('name');
        t.nonNull.string('email');
        t.nonNull.field('faveColour', {
            type: 'Colour',
            resolve: async (source) => {
                const colourId = source.faveColour;
                return await getColour(colourId);
            },
        });
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
    },
});
