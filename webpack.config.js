const path = require("path");
const _ = require("lodash");

const webpack = require("webpack");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OpenBrowserWebpackPlugin = require("open-browser-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const CONFIG_DEFAULT = {
    context: path.join(__dirname, "./src"),
    entry: {
        main: "./main.ts",
        vendor: "./vendor.ts"
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: "ts",
                exclude: /node_modules|typings/,
                query: {
                    compilerOptions: {
                        //"target": "es6",
                        //"module": "es2015"
                    }
                }
            }, {
                test: /\.json/,
                loader: "json"
            }, {
                test: /\.scss/,
                loaders: [
                    ExtractTextWebpackPlugin.extract("style"),
                    { loader: "css", query: { modules: false, sourceMap: true } },
                    { loader: "postcss" },
                    { loader: "resolve-url" },
                    { loader: "sass", query: { sourceMap: true } }
                ]
            }, {
                test: /\.(jpg|eot|ttf|woff|woff2|svg)/,
                loader: "file",
                query: {
                    name: "[path][hash].[ext]"
                }
            }, {
                test: /\.png/,
                loader: "url"
            }, {
                test: /\.html$/,
                loader: "html"
            }
        ]
    },
    postcss: function () {
        return [require('autoprefixer')];
    },
    resolve: {
        extensions: ["", ".ts", ".js", ".scss"],
        modules: [
            path.resolve("./src"),
            "node_modules"
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin("styles.[hash].css"),
        new HtmlWebpackPlugin({
            template: "./index.html",
            favicon: "./favicon.ico"
        })
    ]
};

const CONFIG_TARGET = {
    DEV: {
        debug: true,
        devtool: "source-map",
        output: {
            path: path.join(__dirname, "./dev"),
            publicPath: "fintech-example",
            filename: "[name].js"
        },
        plugins: [
            new OpenBrowserWebpackPlugin({
                url: "http://localhost:8080/fintech-example"
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
                filename: "vendor.js"
            }),
            new webpack.DefinePlugin({
                PROD: "false"
            })
        ]
    },
    PROD: {
        output: {
            path: path.join(__dirname, "./prod"),
            publicPath: "fintech-example",
            filename: "[name].[chunkhash].js"
        },
        plugins: [
            new CompressionWebpackPlugin({
                asset: "[path][file].gz[query]",
            }),
            new webpack.optimize.UglifyJsPlugin({
                mangle: true
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
                filename: "vendor.[chunkhash].js"
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.DefinePlugin({
                PROD: "true"
            }),
            new CleanWebpackPlugin(["prod"])
        ]
    }
};

module.exports = function(env) {
    return  _.mergeWith(CONFIG_DEFAULT, CONFIG_TARGET[env.TARGET || "DEV"], function (a, b) {
        return _.isArray(a) ? _.concat(a, b) : undefined;
    });
    return config;
};