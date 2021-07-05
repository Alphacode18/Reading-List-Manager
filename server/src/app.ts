import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
const _port = 3000 || process.env.PORT;

const app = express();

app.use(cors);
app.use(
  '/graphql',
  graphqlHTTP({
    //Add Config
  })
);

app.listen(3000, () => {
  console.log(`Server established on ${_port}`);
});
