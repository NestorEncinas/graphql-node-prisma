const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const Query = require("./resolvers/query");
const Mutation = require("./resolvers/mutation");
const User = require("./resolvers/user");
const Link = require("./resolvers/link");
const Subscription = require("./resolvers/subscription");
const Vote = require("./resolvers/vote");

// https://www.howtographql.com/graphql-js/1-getting-started/

// let links = [
//   {
//     id: "link-0",
//     url: "www.howtographql.com",
//     description: "Fullstack turotiral for Graphql"
//   },
//   {
//     id: "link-1",
//     url: "www.howtographql.com",
//     description: "Fullstack turotiral for Graphql"
//   },
//   {
//     id: "link-2",
//     url: "www.howtographql.com",
//     description: "Fullstack turotiral for Graphql"
//   }
// ];

// let idCount = links.length;
/**
 * 1 - TypeDefs: defines your Graphql schema. Here, it defines a simple Query
 *     type with one field called info. THis filed has the type String!
 *  */

// const typeDefs = `
// type Query {
//   info: String!
//   feed: [Link!]!
// }

// type Link {
//    id: ID!
//    description: String!
//    url: String!
// }

// type Mutation {
//    post(url: String!, description: String!): Link!
// }
// `;

/**
 * 2 - Resolvers: object is the actual implementation of the GraphQl schema *
 */
const checkIfIdExists = args => {
  const exist = links.find(link => link.id === args.id);
  if (!exist) {
    throw new Error(`Link with ID ${args.id} doesn't exist.`);
  }

  return exist;
};

// const resolvers = {
//   Query: {
//     info: () => `This is the API of a Hackernews Clone`,
//     // feed: () => links,
//     feed: (root, args, context, info) => {
//       return context.prisma.links();
//     }
//     // link: (parent, { id }) => links.find(link => link.id === id)
//   },
//   Mutation: {
//     post: (parent, { url, description }, context) => {
//       // const link = {
//       //   id: `link-${idCount++}`,
//       //   description: args.description,
//       //   url: args.url
//       // };
//       // links.push(link);
//       // return link;
//       return context.prisma.createLink({
//         url,
//         description
//       });
//     },
//     updateLink: (parent, args) => {
//       // create new link, map trough links and check that ID doesnt exist

//       //       const updateLink = checkIfIdExists(args);

//       //       const newLink = { ...updateLink, ...args };

//       links = links.map(link => {
//         if (link.id === args.id) {
//           newLink = { ...link, ...args };
//           return newLink;
//         }
//         return link;
//       });

//       return newLink;
//     },
//     deleteLink: (parent, args) => {
//       const deleteLink = checkIfIdExists(args);

//       links = links.filter(link => link.id !== args.id);

//       return deleteLink;
//     }
//   }
// };

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote
};

/**
 * 3 - GraphQLServer: schema and reslvers are bundled and passed here.
 *     This tells the server what API operations are accepted and how
 *     they should be resolved
 */

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  // context: { prisma }
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
