import jwt from 'jsonwebtoken';
import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus';
import { APP_SECRET } from 'src/utils';
import {
    createNewUserPayload,
    createUser,
    getCurrentUserPayload,
    getUser,
    loginUser,
    loginUserPayload,
} from '../model';

export const authPayloadType = objectType({
    name: 'AuthPayload',
    definition(t) {
        t.string('token'),
            t.field('user', {
                type: 'User',
            });
    },
});

export const authQuery = extendType({
    type: 'Query',
    definition(t) {
        t.field('currentUser', {
            type: 'AuthPayload',
            resolve: async (_root, _args, ctx) => {
                return await getCurrentUserPayload(ctx.userId, ctx.prisma);
            },
        });
    },
});

export const authMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('signup', {
            type: 'AuthPayload',
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
                name: nonNull(stringArg()),
                faveColour: intArg(),
            },
            resolve: async (_root, args, ctx) => {
                return await createNewUserPayload(args, ctx.prisma);
            },
        });
        t.field('login', {
            type: 'AuthPayload',
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            resolve: async (_root, args, ctx) => {
                return await loginUserPayload(args, ctx.prisma);
            },
        });
    },
});
