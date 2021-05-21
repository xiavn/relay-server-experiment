import { objectType } from 'nexus';

export const userType = objectType({
    name: 'User',
    definition(t) {
        t.nonNull.int('id'),
            t.nonNull.string('name'),
            t.nonNull.string('email'),
            t.nonNull.list.nonNull.field('links', {
                type: 'Link',
                resolve: async (root, args, ctx) => {
                    return await ctx.prisma.user
                        .findUnique({
                            where: { id: root.id },
                        })
                        .links();
                },
            });
    },
});
