import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInputObjectType,
} from 'graphql'
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date'
// import GraphQLDate from 'graphql-date');
import emisionModel from '../models/emisionModel'
import userModel from '../models/userModel'
// import { errorName, errorType } from '../constants'
// const { errorName, errorType } = require('../constants')

/** ***************************
 * LOTE
 **************************** */
const loteType = new GraphQLObjectType({
  name: 'tipo_lote',
  fields: {
    ID: { type: GraphQLString },
    FECHA_REGISTRO: { type: GraphQLDateTime },
    CANTIDAD_TOTAL_DOCUMENTOS: { type: GraphQLInt },
    ESTADO: { type: GraphQLInt },
    EMISOR: { type: GraphQLString },
    CANTIDAD_ACEPTADOS: { type: GraphQLInt },
    CANTIDAD_RECHAZADOS: { type: GraphQLInt },
    CANTIDAD_DOC_ERROR: { type: GraphQLInt },
  },
})

/** ***************************
 * USER
 **************************** */
const userType = new GraphQLObjectType({
  name: 'user',
  fields: {
    id: { type: GraphQLString },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    state: { type: GraphQLBoolean },
    accessToken: { type: GraphQLString },
  },
})

/** ***************************
 * QUERY
 **************************** */
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    lote: {
      type: GraphQLList(loteType),
      resolve: () =>
        emisionModel
          .readAll()
          .then(res => res)
          .catch(err => {
            throw new Error(err.message)
          }),
    },
    getLoteById: {
      type: loteType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_, { id }) =>
        emisionModel
          .readById(id)
          .then(res => res[0])
          .catch(err => {
            throw new Error(err.message)
          }),
      // throw new Error(`[${errorType[errorName.QUERY_ERROR].errorCode}] ${errorType[errorName.QUERY_ERROR].message}. Param: ${id}`)
    },
    authentication: {
      type: userType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: (_, { email, password }) =>
        userModel
          .authentication(email, password)
          .then(res => res)
          .catch(err => {
            throw new Error(err.message)
          }),
    },
  },
})

const schema = new GraphQLSchema({ query: queryType })
export default schema
