import express from 'express';
const app = express();
import { auth } from 'express-openid-connect';
import { renderingHome } from './routes/renderingHomePage.js';
import { config } from 'dotenv';

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.config.SECRET,
  baseURL: process.config.BASEURL,
  clientID: process.config.CLIENTID,
  issuerBaseURL: process.config.ISSUERBASEURL,
};

app.use(auth(config));

app.use(express.static('public'));

app.get('/', renderingHome);
app.get('/login', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

export default app;
