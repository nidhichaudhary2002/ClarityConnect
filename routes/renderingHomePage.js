import app from '../index.js';

export function renderingHome(res, req) {
  app.get('', (res, req) => {
    res.render('home');
  });
}
