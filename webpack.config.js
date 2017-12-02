const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const dev = process.env.NODE_ENV === 'dev';

let config = {
    entry: './app/app.js',
    watch: dev,
    output: {
        path: path.resolve('./public/'),
        filename: 'app.min.js'
    },
    devtool: dev ? 'cheap-module-eval-source-map' : 'source-map',
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /(node_modules|bower_components|public)/,
                use: ['eslint-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: []
};

if (!dev) {
    config.plugins.push(new UglifyJSPlugin({
        sourceMap: true
    }));
}
module.exports = config;
