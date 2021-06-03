import { User } from '../source-types';
import { Prisma } from '../context';

export const getUser = async (
    id: number,
    prisma: Prisma,
): Promise<User | null> => {
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
    return null;
};

export const getLinksForUser = async (
    id: number,
    prisma: Prisma,
): Promise<Link[]> => {
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
