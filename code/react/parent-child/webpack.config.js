const path = require('path');
const outputPath = path.resolve(__dirname, 'public/dist');

module.exports = {
    entry: "./src/main.js",
    output:  {
        path:       outputPath,
        filename:   'main.js',
        publicPath: '/dist'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/,  loader: 'babel'}
        ]
    },
    devtool: 'source-map'

};
