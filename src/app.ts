import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './user/user.route';

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use('/', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
