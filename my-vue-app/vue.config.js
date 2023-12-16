const { defineConfig } = require('@vue/cli-service')
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://dummy.restapiexample.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        onProxyRes: function (proxyRes) {
          proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:8080';
        },
      },
    },
  },
};

