import { extendType, intArg, objectType, stringArg } from 'nexus';
import { editUser, getLinksForUser } from '../model';
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

export const userMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('editUser', {
            type: 'User',
            args: {
                name: stringArg(),
                faveColour: intArg(),
            },
            resolve: async (_root, args, ctx) => {
                if (!ctx.userId) {
                    throw new Error('Please sign in to edit profile');
                }
                return await editUser(
                    { ...args, userId: ctx.userId },
                    ctx.prisma,
                );
            },
        });
    },
});
