interface ConnectionArguments {
    // args
    after?: string | null; // String
    before?: string | null; // String
    first?: number | null; // Int
    last?: number | null; // Int
}

interface ProcessEdgesArguments extends ConnectionArguments {
    edges: Edge[];
}

interface Edge {
    cursor: string;
    node: {};
}

const applyCursorsToEdges = ({
    edges,
    before,
    after,
}: Omit<ProcessEdgesArguments, 'first' | 'last'>) => {
    if (after) {
        const afterEdgePosition = edges.findIndex(
            (edge) => edge.cursor === after,
        );
        const afterEdge = edges[afterEdgePosition];
        const slicedEdges = edges.slice(afterEdgePosition + 1);
        return { afterEdge, edges };
    }
};

const edgesToReturn = ({ edges, first, last }: ProcessEdgesArguments) => {
    if (first) {
        if (first < 0) {
            throw new Error('$first should be a positive integer');
        }
        return edges.slice(0, first);
    }
    if (last) {
        if (last < 0) {
            throw new Error('$last should be a positive integer');
        }
        return edges.slice(edges.length - last);
    }
};

export const createConnection = async (
    root,
    args: ConnectionArguments,
    ctx,
) => {};
