import { User } from '@prisma/client';
import { Prisma } from '../context';

export const getUser: Promise<(User & { __typename: 'User' }) | null> = async (
    id: number,
    prisma: Prisma,
) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (user !== null) {
        return {
            ...user,
            __typename: 'User',
        };
    }
};

export const getLinksForUser = async (id: number, prisma: Prisma) => {
    const links = await prisma.user
        .findUnique({
            where: { id },
        })
        .links();
    return links.map((link) => ({
        ...link,
        __typename: 'Link',
    }));
};
