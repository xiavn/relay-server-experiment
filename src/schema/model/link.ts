import { link } from 'fs';
import { NexusGenArgTypes } from 'src/nexus-typegen';
import { Prisma } from '../context';
import { Link, User } from '../source-types';
import { item, itemOrNull } from './utils';

export const getLink = async (id: number, prisma: Prisma) => {
    const link = await prisma.link.findUnique({
        where: {
            id,
        },
    });
    return itemOrNull<Link>(link, 'Link');
};

export const getUserForLink = async (id: number, prisma: Prisma) => {
    const user = await prisma.link.findUnique({ where: { id } }).postedBy();
    return itemOrNull<User>(user, 'User');
};

type NewLinkArguments = NexusGenArgTypes['Mutation']['createLink'] & {
    userId: number;
};

export const createNewLink = async (
    { description, url, userId }: NewLinkArguments,
    prisma: Prisma,
) => {
    const newLink = await prisma.link.create({
        data: {
            description,
            url,
            postedBy: { connect: { id: userId } },
        },
    });
    return item<Link>(newLink, 'Link');
};

type UpdateLinkArguments = Omit<
    NexusGenArgTypes['Mutation']['updateLink'],
    'id'
> & {
    id: number;
    userId: number;
};

export const updateLink = async (
    { userId, ...args }: UpdateLinkArguments,
    prisma: Prisma,
) => {
    const link = await prisma.link.update({
        where: {
            id: userId,
        },
        data: {
            ...args,
            id: userId,
        },
    });
    return item<Link>(link, 'Link');
};
