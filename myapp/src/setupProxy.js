const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/message',
    createProxyMiddleware({
      target: 'http://localhost:5000/message',
      changeOrigin: true,
    }),
  );
};
