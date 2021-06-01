import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { APP_SECRET } from 'src/utils';

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
            },
            resolve: async (_root, args, ctx) => {
                const password = await bcrypt.hash(args.password, 10);
                const user = await ctx.prisma.user.create({
                    data: {
                        ...args,
                        password,
                    },
                });
                const token = jwt.sign({ userId: user.id }, APP_SECRET);
                return { token, user };
            },
        });
        t.field('login', {
            type: 'AuthPayload',
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            resolve: async (_root, args, ctx) => {
                const user = await ctx.prisma.user.findUnique({
                    where: { email: args.email },
                });
                if (!user) {
                    throw new Error('No user found');
                }

                const valid = await bcrypt.compare(
                    args.password,
                    user.password,
                );
                if (!valid) {
                    throw new Error('Invalid password');
                }

                const token = jwt.sign({ userId: user.id }, APP_SECRET);
                return {
                    token,
                    user,
                };
            },
        });
    },
});
