import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";
import {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    globalIdField,
    mutationWithClientMutationId,
} from "graphql-relay";

import { NodeField, NodeInterface, NodesField } from "./NodeInterface";
import { IUser } from "./types";
import { users } from "./utils";

export const UserType: GraphQLObjectType = new GraphQLObjectType<IUser>({
    name: "User",
    description: "User",
    fields: () => ({
        fields: globalIdField("User"),
        firstName: {
            type: GraphQLNonNull(GraphQLString),
            resolve: ({ firstName }) => firstName,
        },
        lastName: {
            type: GraphQLNonNull(GraphQLString),
            resolve: ({ lastName }) => lastName,
        },
    }),
    interfaces: () => [NodeInterface],
});

export const UserConnection = connectionDefinitions({
    name: "User",
    nodeType: UserType,
});

export const QueryType = new GraphQLObjectType({
    name: "Query",
    description: "The root of all... queries",
    fields: () => ({
        node: NodeField,
        nodes: NodesField,
        users: {
            type: GraphQLNonNull(UserConnection.connectionType),
            args: {
                ...connectionArgs,
            },
            resolve: (_, args) => connectionFromArray(users, args),
        },
    }),
});

const UserCreate = mutationWithClientMutationId({
    name: "UserCreate",
    inputFields: {
        firstName: {
            type: new GraphQLNonNull(GraphQLString),
        },
        lastName: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    mutateAndGetPayload: async ({ firstName, lastName }) => {
        const newUser = { firstName, lastName };
        users.push(newUser);
        return {
            message: "Success",
            error: null,
        };
    },
    outputFields: {
        message: {
            type: GraphQLString,
            resolve: ({ message }) => message,
        },
        error: {
            type: GraphQLString,
            resolve: ({ error }) => error,
        },
    },
});

export const MutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "MutationType",
    fields: () => ({
        UserCreate,
    }),
});
