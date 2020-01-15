import express from 'express'
import winston from 'winston'
import path from 'path'
import graphqlHTTP from 'express-graphql'
import dotenv from 'dotenv'
import cors from 'cors'
import schema from './graphql/schema'
import checkToken from './middlewares/token'

/* #region CORS */
// import { errorType } from './constants'

dotenv.config()

const app = express()

// middleware app
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
// verifica token
app.use(checkToken)
app.use(cors())
/* #endregion */

/* #region logger */
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  //   defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  )
}

/* #endregion */
app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    rootValue: global,
    schema,
    customFormatErrorFn: error => ({
      message: error.message || 'internal server error',
      locations: error.locations,
      stack: error.stack ? error.stack.split('\n') : [],
      path: error.path || 'Path not defined',
    }),
  })
)

// app.use(
//   '/graphql',
//   graphqlHTTP(async (request, response, graphQLParams) => {
//     return {
//       schema: emision,
//       graphiql: true,
//       context: {
//         req: request
//       },
//     };
//   })
// );

/* #endregion */

// START server

app.listen(process.env.NODE_PORT, () => {
  logger.info(
    `CORS-Enabled: Listening to port ${process.env.NODE_PORT} - Express JS | graphQL`
  )
})
