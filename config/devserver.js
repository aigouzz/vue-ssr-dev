let config = require('./webpack.config.js');
let webpack = require('webpack');
let webpackDevServer = require('webpack-dev-server');

let compiler = webpack(config);

let server = new webpackDevServer(compiler, {
    historyApiFallback: true,
    open: true,
    hot: true,
    proxy: {
        '/api': {
            target: 'http://127.0.0.1',
            pathRewrite: {
                '/api': ''
            },
            changeOrigin: true
        }
    },
});
server.listen(8081, () => {
    console.log('devserver开启，地址http://localhost:8081');
});
