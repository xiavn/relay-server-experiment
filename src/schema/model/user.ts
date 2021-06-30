import bcrypt from 'bcryptjs';
import { NexusGenArgTypes } from 'src/nexus-typegen';
import { User, Link } from '../source-types';
import { Prisma } from '../context';
import { itemOrNull, itemList, item } from './utils';

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

export const createUser = async (
    newUser: NexusGenArgTypes['Mutation']['signup'],
    prisma: Prisma,
) => {
    const password = await bcrypt.hash(newUser.password, 10);
    const user = await prisma.user.create({
        data: {
            ...newUser,
            faveColour: newUser.faveColour ? newUser.faveColour : undefined,
            password,
        },
    });
    return item<User>(user, 'User');
};

export const loginUser = async (
    userArgs: NexusGenArgTypes['Mutation']['login'],
    prisma: Prisma,
) => {
    const user = await prisma.user.findUnique({
        where: { email: userArgs.email },
    });
    if (!user) {
        throw new Error('No user found');
    }
    const valid = await bcrypt.compare(userArgs.password, user.password);
    if (!valid) {
        throw new Error('Invalid password');
    }
    return item<User>(user, 'User');
};

export const editUser = async (
    {
        userId,
        name,
        faveColour,
    }: NexusGenArgTypes['Mutation']['editUser'] & { userId: number },
    prisma: Prisma,
) => {
    const user = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            name: name ? name : undefined,
            faveColour: faveColour ? faveColour : undefined,
            id: userId,
        },
    });
    return item<User>(user, 'User');
};
