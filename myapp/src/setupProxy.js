const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = {
  target: 'http://localhost:5001',
  changeOrigin: true,
}

module.exports = (app) => {
  app.use(
    '/',
    createProxyMiddleware(proxy),
  );
};
