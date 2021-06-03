import { Prisma } from '../context';
import { Link } from '../source-types';
import { itemOrNull } from './utils';

export const getLink = async (id: number, prisma: Prisma) => {
    const link = await prisma.link.findUnique({
        where: {
            id: Number(id),
        },
    });
    return itemOrNull<Link>(link, 'Link');
};
