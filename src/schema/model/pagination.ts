import { offsetToCursor, toGlobalId } from 'graphql-relay';
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

export const createConnection = <I extends NodeType>(
    args: ConnectionArguments,
    data: I[],
) => {
    const edges = createEdges<I>(data);
    const { edges: filteredEdges, pageInfo } = filterEdgesToAmount<I>({
        edges,
        ...args,
    });
    return {
        edges: filteredEdges,
        pageCursors: {
            totalRecords: edges.length,
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
        },
        pageInfo: {
            ...pageInfo,
            startCursor: filteredEdges.length ? filteredEdges[0].cursor : null,
            endCursor: filteredEdges.length
                ? filteredEdges[filteredEdges.length - 1].cursor
                : null,
        },
    };
};
