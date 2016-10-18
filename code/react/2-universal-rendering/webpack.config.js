const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        "./src/client/main.js"
    ],
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    output:  {
        // output path
        path:       path.resolve(__dirname, 'public/dist'),
        publicPath: 'dist/',
        filename:   'main.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/,   loaders: ['react-hot-loader/webpack', 'babel']}
        ],
        preLoaders: [
            // { test: /\.js$/, loader: 'eslint', exclude: /node_modules/},
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    devtool: 'source-map'

};
