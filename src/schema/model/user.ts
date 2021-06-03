import { User, Link } from '../source-types';
import { Prisma } from '../context';
import { itemOrNull, itemList } from './utils';

export const getUser = async (
    id: number,
    prisma: Prisma,
): Promise<User | null> => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    return itemOrNull<User>(user, 'User');
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
    return itemList<Link>(links, 'Link');
};
