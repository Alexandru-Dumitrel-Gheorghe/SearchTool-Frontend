// frontend/src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy pentru /api
  app.use('/api', createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true
  }));

  // Proxy și pentru /uploads
  app.use('/uploads', createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true
  }));
};
