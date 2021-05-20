import { buildSchema, GraphQLObjectType, GraphQLSchema } from "graphql";
import { makeSchema } from "nexus";
import { join } from "path";
import { nodeField } from "./node";
import * as types from "./types";

// const query = new GraphQLObjectType({
//     name: "Query",
//     fields: () => ({
//         link:
//         node: nodeField,
//     }),
// });

// const schema = new GraphQLSchema({
//     query,
// });

const schema = makeSchema({
    types,
    outputs: {
        typegen: join(__dirname, "..", "nexus-typegen.ts"),
        schema: join(__dirname, "..", "schema.graphql"),
    },
});

export default schema;
