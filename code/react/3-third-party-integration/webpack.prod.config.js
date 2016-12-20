const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        "./src/main.js"
    ],
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
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
