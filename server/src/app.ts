import express from 'express';

const app = express();

const _port = 3000 || process.env.PORT;

app.listen(3000, () => {
  console.log(`Server established on ${_port}`);
});
