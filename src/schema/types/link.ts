import { fromGlobalId } from 'graphql-relay';
import {
    extendType,
    idArg,
    intArg,
    nonNull,
    objectType,
    stringArg,
} from 'nexus';
import { createNewLink, getLink, getUserForLink, updateLink } from '../model';
import { Link } from '../source-types';

const subscriptionLabels = {
    newLink: 'NEW_LINK',
};

export const linkType = objectType({
    name: 'Link',
    definition(t) {
        t.implements('Node');
        t.string('description');
        t.string('url');
        t.field('postedBy', {
            type: 'User',
            resolve: async (source, _args, ctx) => {
                return await getUserForLink(source.id, ctx.prisma);
            },
        });
        t.nonNull.list.nonNull.field('votes', {
            type: 'Vote',
            resolve: async (root, _args, ctx) => {
                return await ctx.prisma.link
                    .findUnique({ where: { id: root.id } })
                    .votes();
            },
        });
    },
});

export const linkQuery = extendType({
    type: 'Query',
    definition(t) {
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
                id: nonNull(intArg()),
            },
            resolve: async (_root, args, ctx) => {
                const removed = await ctx.prisma.link.delete({
                    where: {
                        id: args.id,
                    },
                });
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
