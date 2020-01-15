const resolvers = require("./resolvers");
const makeExecutableSchema = require("graphql-tools");

const typeDefs = `
type Query {
        hello: String
        greet: Int
      }
`;

module.exports makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});
