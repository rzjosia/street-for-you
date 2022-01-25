const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
require('@babel/register');
const resolve = require('resolve');

module.exports = env => {
    return {
        entry: ['./src/css/style.css', 'leaflet/dist/leaflet.css', './src/js/app.js', './src/js/mzbox.min.js'],
        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: '[name].bundle.js',
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    type: "asset/resource",
                    use: {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: '/'
                        }
                    },
                },
            ]
        },
        plugins: [
            new htmlWebpackPlugin({
                template: 'src/index.html',
                filename: 'index.html',
                hash: true
            })
        ],
        resolve:{
            extensions: ['*', '.js', '.jsx', '.json'],
            symlinks: false,
            cacheWithContext: false
         }
    };
};