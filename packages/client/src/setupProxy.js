const { createProxyMiddleware } = require('http-proxy-middleware');

/** @type {import('http-proxy-middleware').Options} */
const proxy = {
  target: 'http://127.0.0.1:5001/',
  headers: {
    "Connection": "keep-alive"
  },
};

const routes = ['animes', 'mangas', 'books', 'movies'];

module.exports = (app) => {
  app.use(
    '/api/signup',
    createProxyMiddleware(proxy),
  );
  app.use(
    '/api/login',
    createProxyMiddleware(proxy),
  );
  app.use(
    '/api/logout',
    createProxyMiddleware(proxy),
  );
  app.use(
    '/api/is-user-auth',
    createProxyMiddleware(proxy),
  );
  app.use(
    '/profiles/api/0',
    createProxyMiddleware(proxy),
  );
  app.use(
    [
      '/weapons/api',
      '/animes/api',
      '/books/api',
      '/movies/api',
      '/search/api',
      '/mangas/api',
    ],
    createProxyMiddleware(proxy),
  )
};
