import { Prisma } from '../context';
import { Link, User, Vote } from '../source-types';
import { itemOrNull } from './utils';

export const getVote = async (id: number, prisma: Prisma) => {
    const vote = await prisma.vote.findUnique({
        where: {
            id,
        },
    });
    return itemOrNull<Vote>(vote, 'Vote');
};

export const getLinkForVote = async (id: number, prisma: Prisma) => {
    const link = await prisma.vote
        .findUnique({
            where: {
                id,
            },
        })
        .link();
    return itemOrNull<Link>(link, 'Link');
};

export const getUserForVote = async (id: number, prisma: Prisma) => {
    const user = await prisma.vote
        .findUnique({
            where: {
                id,
            },
        })
        .user();
    return itemOrNull<User>(user, 'User');
};
