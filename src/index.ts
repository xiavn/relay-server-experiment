import { ApolloServer } from 'apollo-server';
import schema, { contextFunction } from './nexus-schema';

const server = new ApolloServer({
    schema,
    context: contextFunction,
});

server
    .listen()
    .then(({ url }) => console.log(`🚀 Server is running on ${url}`));
