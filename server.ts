import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import oauthRouter from './oauth';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/oauth', oauthRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
