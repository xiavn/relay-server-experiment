import { Prisma } from '../context';
import { Link, User } from '../source-types';
import { itemOrNull } from './utils';

export const getLink = async (id: number, prisma: Prisma) => {
    const link = await prisma.link.findUnique({
        where: {
            id: Number(id),
        },
    });
    return itemOrNull<Link>(link, 'Link');
};

export const getUserForLink = async (id: number, prisma: Prisma) => {
    const user = await prisma.link.findUnique({ where: { id } }).postedBy();
    return itemOrNull<User>(user, 'User');
};
