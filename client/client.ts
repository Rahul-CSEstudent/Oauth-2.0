import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = 8000;

app.get('/callback', (req, res) => {
  // Handle the authorization code returned from the server
  const { code } = req.query;
  console.log('Authorization code:', code);

  // TODO: Exchange the authorization code for an access token

  res.send('Authorization Successful!');
});

app.listen(PORT, () => {
  console.log(`Client site running on port ${PORT}`);
});
