import * as prisma from '@prisma/client';

export type User = prisma.User & { __typename: 'User' };

export type Link = prisma.Link & { __typename: 'Link' };

export type Vote = prisma.Vote & { __typename: 'Vote' };
