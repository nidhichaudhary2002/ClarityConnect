import express from 'express';
const app = express();
import { renderingHome } from './routes/renderingHomePage.js';
import { auth } from 'express-openid-connect';
import dotenv from 'dotenv';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
// const expressLayouts = require('express-ejs-layouts')
// import router from './features/deviceAccess/videoAndAudioAccess.route.js';

// Configuring Auth0 starts
dotenv.config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUERBASEURL,
};
app.use(auth(config));

// Configuring Auth0 ends
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'public', 'views'));
app.use(expressLayouts);
app.use(express.static('public/views'));

app.get('/', renderingHome);
app.get('/login', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

export default app;
