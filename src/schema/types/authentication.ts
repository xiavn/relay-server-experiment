import jwt from 'jsonwebtoken';
import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus';
import { APP_SECRET } from 'src/utils';
import { createUser, loginUser } from '../model';

export const authPayloadType = objectType({
    name: 'AuthPayload',
    definition(t) {
        t.string('token'),
            t.field('user', {
                type: 'User',
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
                const user = await createUser(args, ctx.prisma);
                const token = jwt.sign({ userId: user.id }, APP_SECRET);
                return { token, user };
            },
        });
    },
});

export const authQuery = extendType({
    type: 'Query',
    definition(t) {
        t.field('login', {
            type: 'AuthPayload',
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            resolve: async (_root, args, ctx) => {
                const user = await loginUser(args, ctx.prisma);
                const token = jwt.sign({ userId: user.id }, APP_SECRET);
                return {
                    token,
                    user,
                };
            },
        });
    },
});
