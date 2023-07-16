import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();


const clients = [
  {
    id: 'client1',
    secret: 'client1secret',
    redirectUri: 'http://localhost:8000/callback',
  },
];

const users = [
  {
    id: 'user1',
    username: 'user1',
    password: 'password1',
  },
];

const generateToken = (payload: object) => {
  const privateKey = 'your-private-key'; // Replace with your private key
  return jwt.sign(payload, privateKey, { expiresIn: '1h' });
};

router.post('/token', (req, res) => {
  const { client_id, client_secret, grant_type, code } = req.body;

  // Verify client credentials
  const client = clients.find((c) => c.id === client_id && c.secret === client_secret);
  if (!client) {
    return res.status(401).json({ error: 'Invalid client credentials' });
  }

  // Generate and return access token
  if (grant_type === 'authorization_code') {
    // Verify authorization code (replace with proper implementation)
    const validCode = code === 'valid_code';
    if (!validCode) {
      return res.status(400).json({ error: 'Invalid authorization code' });
    }

    const accessToken = generateToken({ sub: client_id });
    return res.status(200).json({ access_token: accessToken });
  }

  return res.status(400).json({ error: 'Invalid grant_type' });
});

router.get('/authorize', (req, res) => {
  const { client_id, redirect_uri, response_type } = req.query;

  // Verify client and redirect URI
  const client = clients.find((c) => c.id === client_id && c.redirectUri === redirect_uri);
  if (!client) {
    return res.status(401).json({ error: 'Invalid client or redirect URI' });
  }


  const authorizationCode = 'valid_code';
  return res.redirect(`${redirect_uri}?code=${authorizationCode}&response_type=${response_type}`);
});

export default router;
