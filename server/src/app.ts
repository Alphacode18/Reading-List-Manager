/*
 * Third Party Imports
 */

import express from 'express';
// import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
const _port = 3000 || process.env.PORT;

/*
 * Internal Imports
 */

import schema from './schema/schema';

/*
 * Application Setup
 */

const app = express();
// app.use(cors);
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

/*
 * Application Initialization
 */

app.listen(_port, () => {
  console.log(`Server established on ${_port}`);
});
