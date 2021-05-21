import { PrismaClient } from '@prisma/client';
import { PubSub } from 'apollo-server';
import { ContextFunction } from 'apollo-server-core';
import { ExpressContext } from 'apollo-server-express';
import { getUserId } from 'src/utils';

const prisma = new PrismaClient();
const pubsub = new PubSub();

export type Context = {
    prisma: typeof prisma;
    pubsub: typeof pubsub;
    userId: string | null;
};

export const contextFunction: ContextFunction<ExpressContext, Context> = ({
    req,
}) => ({
    ...req,
    prisma,
    pubsub,
    userId:
        req && req.headers.authorization
            ? getUserId(req.headers.authorization)
            : null,
});
