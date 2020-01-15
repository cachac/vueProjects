
import express from "express";
// const graphqlHTTP = require("express-graphql");
// const { buildSchema } = require("graphql");
import winston from "winston";
const path = require("path");
const app = express();
require("dotenv").config();

/* #region CORS */
const cors = require("cors");
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
/* #endregion */

// middleware app
app.use(express.json());

/* #region logger */
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

/*#endregion*/

/* #region GraphQL */
// const schema = require("./schema");

// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema: schema,
//     graphiql: true
//   })
// );

/* #endregion*/

// START
app.listen(process.env.NODE_PORT, () => {
  logger.info(
    `CORS-Enabled: Listening to port ${process.env.NODE_PORT} - Express JS | GraphQL`
  );
  //
});
