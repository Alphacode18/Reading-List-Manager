/*
 * Third Party Imports
 */

import express from 'express';
import * as dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
const _port = 3000 || process.env.PORT;

dotenv.config();

/*
 * Internal Imports
 */

import schema from './schema/schema';
import { connectDatabase } from './utils/database';

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

connectDatabase();

/*
 * Application Initialization
 */

app.listen(_port, () => {
  console.log(`Server established on ${_port}`);
});
