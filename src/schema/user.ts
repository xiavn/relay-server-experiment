import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionDefinitions, globalIdField } from 'graphql-relay';

export const userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: globalIdField(),
        name: {
            type: GraphQLNonNull(GraphQLString),
        },
        email: {
            type: GraphQLNonNull(GraphQLString),
        },
    },
});

export const { connectionType: userConnection } = connectionDefinitions({
    nodeType: userType,
});
