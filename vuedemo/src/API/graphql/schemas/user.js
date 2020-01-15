import { makeExecutableSchema } from 'graphql-tools' // crea los schema y une con resolver
import { User } from '../resolvers/user'

const typeDef = `
type Query {
  hello: String
  users: [User]
}
type User {
  _id: ID
  nombre: String
  usuario: String
  passwd: Int
  correo: String
}
`

export default makeExecutableSchema({
  typeDefs: typeDef,
  resolvers: User,
})

/*
type Mutation {
  createUser(input: UserInput): User
}
input UserInput {
  _id: ID
  nombre: String!
  usuario: String!
  passwd: Int!
  correo: String
}
*/
