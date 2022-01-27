const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
require("@babel/register");
const resolve = require("resolve");

module.exports = (env) => {
    return {
        entry: [
            "./src/css/style.css",
            "leaflet/dist/leaflet.css",
            "./src/js/app.js",
            "./src/js/mzbox.min.js"
        ],
        output: {
            path: path.resolve(__dirname, "dist/"),
            filename: "[name].bundle.js",
        },
        optimization: {
            splitChunks: {
                chunks: "all",
            },
        },
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"],
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: {
                        loader: "file-loader",
                    },
                },
            ],
        },
        plugins: [
            new htmlWebpackPlugin({
                template: "src/index.html",
                filename: "index.html",
                hash: true,
            }),
            new htmlWebpackPlugin({
                template: 'src/404.html',
                filename: '404.html',
                hash: true,
            })
        ],
        resolve: {
            extensions: ["*", ".js", ".jsx", ".json"],
            symlinks: false,
            cacheWithContext: false,
        },
        devServer: {
            host: "0.0.0.0",
            historyApiFallback: {
                index: '404.htm'
            }
        },
    };
};
