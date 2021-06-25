import { fromGlobalId } from 'graphql-relay';
import {
    extendType,
    idArg,
    intArg,
    nonNull,
    objectType,
    stringArg,
} from 'nexus';
import {
    createNewLink,
    deleteLink,
    getLink,
    getLinks,
    getUserForLink,
    getVotesForLink,
    updateLink,
} from '../model';
import { createConnection } from '../model/pagination';
import { Link, Vote } from '../source-types';

const subscriptionLabels = {
    newLink: 'NEW_LINK',
};

export const linkType = objectType({
    name: 'Link',
    definition(t) {
        t.implements('Node');
        t.nonNull.int('internalId', {
            resolve: (source) => source.id,
        });
        t.string('description');
        t.string('url');
        t.field('postedBy', {
            type: 'User',
            resolve: async (source, _args, ctx) => {
                return await getUserForLink(source.id, ctx.prisma);
            },
        });
        t.connectionField('votes', {
            type: 'Vote',
            extendConnection(t) {
                t.field('pageCursors', {
                    type: 'PageCursors',
                });
            },
            resolve: async (root, args, ctx) => {
                const data = await getVotesForLink(root.id, ctx.prisma);
                return createConnection<Vote>(args, data);
            },
        });
    },
});

export const linkQuery = extendType({
    type: 'Query',
    definition(t) {
        t.connectionField('links', {
            type: 'Link',
            extendConnection(t) {
                t.field('pageCursors', {
                    type: 'PageCursors',
                });
            },
            resolve: async (_root, args, ctx) => {
                const links = await getLinks(ctx.prisma);
                return createConnection<Link>(args, links);
            },
        });
        t.nonNull.list.field('feed', {
            type: 'Link',
            resolve: async (_root, _args, ctx) => {
                const links = await ctx.prisma.link.findMany();
                return links.map((link) => ({ ...link, __typename: 'Link' }));
            },
        });
        t.field('link', {
            type: 'Link',
            args: {
                id: nonNull(intArg()),
            },
            resolve: async (_root, args, ctx) => {
                return await getLink(args.id, ctx.prisma);
            },
        });
    },
});

export const linkMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('createLink', {
            type: 'Link',
            args: {
                url: nonNull(stringArg()),
                description: nonNull(stringArg()),
            },
            resolve: async (_root, args, ctx) => {
                const { userId } = ctx;
                if (userId === null) {
                    throw new Error(
                        `User needs to be signed in to create new link`,
                    );
                }
                const newLink = await createNewLink(
                    { userId, ...args },
                    ctx.prisma,
                );
                ctx.pubsub.publish(subscriptionLabels.newLink, newLink);
                return newLink;
            },
        });
        t.nonNull.field('updateLink', {
            type: 'Link',
            args: {
                id: nonNull(idArg()),
                url: stringArg(),
                description: stringArg(),
            },
            resolve: async (_root, args, ctx) => {
                const userId = ctx.userId;
                if (userId === null) {
                    throw new Error(`User needs to be signed in to edit link`);
                }
                const { id, type } = fromGlobalId(args.id);
                if (type !== 'Link') {
                    throw new Error(`ID needs to be a Link`);
                }
                return await updateLink(
                    { ...args, id: Number(id), userId },
                    ctx.prisma,
                );
            },
        });
        t.nonNull.field('deleteLink', {
            type: 'Link',
            args: {
                id: nonNull(idArg()),
            },
            resolve: async (_root, args, ctx) => {
                const { id, type } = fromGlobalId(args.id);
                if (type !== 'Link') {
                    throw new Error(`ID needs to be a Link`);
                }
                const removed = await deleteLink(
                    { id: Number(id) },
                    ctx.prisma,
                );
                return removed;
            },
        });
    },
});

export const linkSubscription = extendType({
    type: 'Subscription',
    definition(t) {
        t.field('newLink', {
            type: 'Link',
            subscribe: (_root, _args, ctx) => {
                return ctx.pubsub.asyncIterator(subscriptionLabels.newLink);
            },
            resolve: (eventData: Link) => {
                return eventData;
            },
        });
    },
});
