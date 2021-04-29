const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");

const links = [
    {
        id: "link-0",
        url: "www.howtographql.com",
        description: "Fullstack tutorial for GraphQL",
    },
];

let idCount = links.length;

const resolvers = {
    Query: {
        info: () => null,
        feed: () => links,
        link: (id) => links.find((link) => link.id === id),
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            };
            links.push(link);
            return link;
        },
        updateLink: (parent, args) => {
            const linkIndex = links.findIndex((link) => link.id === args.id);
            if (linkIndex > -1) {
                const updatedLink = {
                    id: args.id,
                    url: args.url,
                    description: args.description,
                };
                links[linkIndex] = updatedLink;
                return updatedLink;
            }
        },
        deleteLink: (parent, args) => {
            const linkIndex = links.findIndex((link) => link.id === args.id);
            if (linkIndex > -1) {
                links.splice(linkIndex, 1);
            }
        },
    },
};

const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
    resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
