import { NexusGenArgTypes } from 'src/nexus-typegen';
import { Prisma } from '../context';
import { Link, User, Vote } from '../source-types';
import { item, itemOrNull } from './utils';

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

type NewVoteArguments = NexusGenArgTypes['Mutation']['addVote'] & {
    userId: number;
};

export const getVoteByUserAndLink = async (
    { userId, linkId }: NewVoteArguments,
    prisma: Prisma,
) => {
    const vote = await prisma.vote.findUnique({
        where: {
            linkId_userId: {
                linkId,
                userId,
            },
        },
    });
    return vote;
};

export const createNewVote = async (
    { userId, linkId }: NewVoteArguments,
    prisma: Prisma,
) => {
    const vote = await getVoteByUserAndLink(
        {
            userId,
            linkId,
        },
        prisma,
    );
    if (Boolean(vote)) {
        throw new Error(`Already voted for link: ${linkId}`);
    }
    const newVote = await prisma.vote.create({
        data: {
            user: { connect: { id: userId } },
            link: { connect: { id: linkId } },
        },
    });
    return item<Vote>(newVote, 'Vote');
};
