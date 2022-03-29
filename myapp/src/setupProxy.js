const { createProxyMiddleware } = require('http-proxy-middleware');

/** @type {import('http-proxy-middleware').Options} */
const proxy = {
  target: 'http://localhost:5001',
  changeOrigin: true,
};

module.exports = (app) => {
  app.use(
    '/search',
    createProxyMiddleware(proxy),
  );
};
