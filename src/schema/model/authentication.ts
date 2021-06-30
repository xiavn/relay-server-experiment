import jwt from 'jsonwebtoken';
import { arg } from 'nexus';
import { NexusGenArgTypes } from 'src/nexus-typegen';
import { APP_SECRET } from 'src/utils';
import { Prisma } from '../context';
import { User } from '../source-types';
import { createUser, getUser, loginUser } from './user';

export const getToken = (id: number) => {
    return jwt.sign({ userId: id }, APP_SECRET);
};

export const createAuthPayload = (user: User) => {
    const token = getToken(user.id);
    return { token, user };
};

export const getCurrentUserAuthPayload = async (
    id: number | null,
    prisma: Prisma,
) => {
    if (id !== null) {
        const user = await getUser(id, prisma);
        if (user !== null) {
            return createAuthPayload(user);
        }
    }
    return null;
};

export const createNewUserPayload = async (
    args: NexusGenArgTypes['Mutation']['signup'],
    prisma: Prisma,
) => {
    const user = await createUser(args, prisma);
    return createAuthPayload(user);
};

export const loginUserPayload = async (
    args: NexusGenArgTypes['Mutation']['login'],
    prisma: Prisma,
) => {
    const user = await loginUser(args, prisma);
    return createAuthPayload(user);
};
