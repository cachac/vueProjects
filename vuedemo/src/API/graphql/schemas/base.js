import { makeExecutableSchema } from 'graphql-tools' // crea los schema y une con resolver
import rBase from '../resolvers/base'

const typeDef = `
type Query {
  hello: String
  greet(name: String!): String
  tasks: [Task]
}
type Task {
  _id: ID
  title: String!
  description: String!
  number: Int
}
type Mutation {
    createTask(input: TaskInput): Task
}
input TaskInput {
    title: String!
    description: String!
    number: Int
}
`

export default makeExecutableSchema({
  typeDefs: typeDef,
  resolvers: rBase,
})
