import { ApolloServer } from 'apollo-server';
import schema, { contextFunction, Context } from './schema';
export { Context };

const server = new ApolloServer({
    schema,
    context: contextFunction,
});

server
    .listen()
    .then(({ url }) => console.log(`🚀 Server is running on ${url}`));
