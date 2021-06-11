import { warn } from 'console';
import { cursorToOffset, offsetToCursor, toGlobalId } from 'graphql-relay';
import { NexusGenObjects } from 'src/nexus-typegen';
import { typenameItem } from './utils';

type NodeType = { id: string | number } & typenameItem;
interface ConnectionArguments {
    // args
    after?: string | null; // String
    before?: string | null; // String
    first?: number | null; // Int
    last?: number | null; // Int
}

interface ProcessEdgesArguments<I extends NodeType>
    extends ConnectionArguments {
    edges: Edge<I>[];
}

interface PageCursorsArguments {
    totalRecords: number;
    maxPagesRequired?: number;
    pageSize: number;
    offset: number;
}

interface CreateArrayOfPageCursorsArguments {
    start: number;
    end: number;
    currentPage: number;
    pageSize: number;
}

interface Edge<I extends NodeType> {
    cursor: string;
    node: I;
}

const filterEdgesToCursor = <I extends NodeType>({
    edges,
    before,
    after,
}: Omit<ProcessEdgesArguments<I>, 'first' | 'last'>) => {
    const pageInfo = {
        hasPreviousPage: false,
        hasNextPage: false,
    };
    if (after) {
        const afterEdgePosition = edges.findIndex(
            (edge) => edge.cursor === after,
        );
        const slicedEdges = edges.slice(afterEdgePosition + 1);
        pageInfo.hasPreviousPage = afterEdgePosition > 0;
        return { edges: slicedEdges, pageInfo };
    }
    if (before) {
        const beforeEdgePosition = edges.findIndex(
            (edge) => edge.cursor === before,
        );
        const slicedEdges = edges.slice(0, beforeEdgePosition);
        pageInfo.hasNextPage = beforeEdgePosition < edges.length - 1;
        return { edges: slicedEdges, pageInfo };
    }
    return { edges, pageInfo };
};

const filterEdgesToAmount = <I extends NodeType>({
    edges,
    first,
    last,
    after,
    before,
}: ProcessEdgesArguments<I>) => {
    const { edges: filteredEdges, pageInfo } = filterEdgesToCursor<I>({
        edges,
        after,
        before,
    });
    if (first) {
        if (first < 0) {
            throw new Error('$first should be a positive integer');
        }
        pageInfo.hasNextPage = filteredEdges.length > first;
        return { edges: filteredEdges.slice(0, first), pageInfo };
    }
    if (last) {
        if (last < 0) {
            throw new Error('$last should be a positive integer');
        }
        pageInfo.hasPreviousPage = filteredEdges.length > last;
        return {
            edges:
                filteredEdges.length > last
                    ? filteredEdges.slice(edges.length - last)
                    : filteredEdges,
            pageInfo,
        };
    }
    return { edges: filteredEdges, pageInfo };
};

const createEdges = <I extends NodeType>(data: I[]) =>
    data.map((item, i) => ({
        cursor: offsetToCursor(i),
        node: item,
    }));

const getPageParamsFromArgs = (
    { first, last, before, after }: ConnectionArguments,
    totalRecords: number,
) => {
    if (first) {
        return {
            size: first,
            offset: after ? cursorToOffset(after) : -1,
        };
    }
    if (last) {
        return {
            size: last,
            offset: before ? cursorToOffset(before) : totalRecords - last,
        };
    }
    return {};
};

const pageToCursor = (page: number, size: number) => {
    return offsetToCursor((page - 1) * size - 1);
};

const createArrayOfPageCursors = ({
    start,
    end,
    currentPage,
    pageSize,
}: CreateArrayOfPageCursorsArguments) => {
    const cursorArray = [];
    for (let page = start; page <= end; page++) {
        cursorArray.push({
            page,
            isCurrent: currentPage === page,
            cursor: pageToCursor(page, pageSize),
        });
    }
    return cursorArray;
};

const createPageCursors = ({
    totalRecords,
    maxPagesRequired = 5,
    pageSize,
    offset,
}: PageCursorsArguments) => {
    // If max is even, bump it up by 1, and log out a warning. Otherwise we would have an uneven around.
    if (maxPagesRequired % 2 === 0) {
        warn(
            `Max of ${maxPagesRequired} passed to page cursors, using ${
                maxPagesRequired + 1
            }`,
        );
        maxPagesRequired = maxPagesRequired + 1;
    }

    const totalPages = Math.ceil(totalRecords / pageSize);
    const pageCursors: NexusGenObjects['PageCursors'] = {
        totalRecords,
        around: [],
    };
    const currentPage = Math.ceil((offset + 1) / pageSize + 1);
    console.log(currentPage, offset, pageSize);
    if (totalPages > 0) {
        if (totalPages <= maxPagesRequired) {
            pageCursors.around = createArrayOfPageCursors({
                start: 1,
                end: totalPages,
                currentPage,
                pageSize,
            });
        }
    }
    return pageCursors;
    return {
        totalRecords,
        first: {
            cursor: 'blah',
            page: 1,
            isCurrent: false,
        },
        last: {
            cursor: 'blah',
            page: 1,
            isCurrent: false,
        },
        previous: {
            cursor: 'blah',
            page: 1,
            isCurrent: false,
        },
        around: [
            {
                cursor: 'blah',
                page: 1,
                isCurrent: false,
            },
            {
                cursor: 'blah',
                page: 1,
                isCurrent: false,
            },
            {
                cursor: 'blah',
                page: 1,
                isCurrent: false,
            },
        ],
    };
};

export const createConnection = <I extends NodeType>(
    args: ConnectionArguments,
    data: I[],
) => {
    const edges = createEdges<I>(data);
    const totalRecords = edges.length;
    const { size, offset } = getPageParamsFromArgs(args, totalRecords);
    const { edges: filteredEdges, pageInfo } = filterEdgesToAmount<I>({
        edges,
        ...args,
    });
    const pageCursors = createPageCursors({
        totalRecords,
        pageSize: size || 0,
        offset: offset || -1,
    });
    return {
        edges: filteredEdges,
        pageCursors,
        pageInfo: {
            ...pageInfo,
            startCursor: filteredEdges.length ? filteredEdges[0].cursor : null,
            endCursor: filteredEdges.length
                ? filteredEdges[filteredEdges.length - 1].cursor
                : null,
        },
    };
};
