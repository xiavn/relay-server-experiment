import { fromGlobalId, nodeDefinitions } from "graphql-relay";

export const { nodeInterface, nodeField } = nodeDefinitions((globalId) => {
    const { type, id } = fromGlobalId(globalId);
    switch (type) {
        default:
            return null;
    }
});
