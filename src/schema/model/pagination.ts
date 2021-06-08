import { toGlobalId } from 'graphql-relay';
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
    if (after) {
        const afterEdgePosition = edges.findIndex(
            (edge) => edge.cursor === after,
        );
        const slicedEdges = edges.slice(afterEdgePosition + 1);
        return slicedEdges;
    }
    if (before) {
        const beforeEdgePosition = edges.findIndex(
            (edge) => edge.cursor === before,
        );
        const slicedEdges = edges.slice(0, beforeEdgePosition);
        return slicedEdges;
    }
    return edges;
};

const filterEdgesToAmount = <I extends NodeType>({
    edges,
    first,
    last,
    after,
    before,
}: ProcessEdgesArguments<I>) => {
    const filteredEdges = filterEdgesToCursor<I>({ edges, after, before });
    if (first) {
        if (first < 0) {
            throw new Error('$first should be a positive integer');
        }
        return filteredEdges.slice(0, first);
    }
    if (last) {
        if (last < 0) {
            throw new Error('$last should be a positive integer');
        }
        return filteredEdges.slice(edges.length - last);
    }
    return filteredEdges;
};

const generatePageInfo = <I extends NodeType>({
    edges,
    first,
    last,
    after,
    before,
}: ProcessEdgesArguments<I>) => ({
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: 'blah',
    endCursor: 'blah',
});

const createEdges = <I extends NodeType>(data: I[]) =>
    data.map((item) => ({
        cursor: toGlobalId(item.__typename, String(item.id)),
        node: item,
    }));

export const createConnection = <I extends NodeType>(
    args: ConnectionArguments,
    data: I[],
    // typename: I['__typename'],
) => {
    const edges = createEdges<I>(data);
    const filteredEdges = filterEdgesToAmount<I>({ edges, ...args });
    return {
        edges: filteredEdges,
        pageCursors: {
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
        pageInfo: generatePageInfo({ edges: filteredEdges, ...args }),
    };
};
