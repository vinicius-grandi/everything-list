const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/message',
    createProxyMiddleware({
      target: 'http://localhost:5001/message',
      changeOrigin: true,
    })
  );
};
