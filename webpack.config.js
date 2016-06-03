const _ = require("lodash");
const path = require("path");
const autoprefixer = require("autoprefixer");

const webpack = require("webpack");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OpenBrowserWebpackPlugin = require("open-browser-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const CONFIG_DEFAULT = {
    context: path.join(__dirname, "./src"),
    entry: {
        vendor: [
            "core-js", "zone.js/dist/zone", "reflect-metadata", "rxjs",
            "@angular/core", "@angular/common", "@angular/http", "@angular/router",
            "@angular/platform-browser-dynamic"
        ],
        styles: ["./main.scss"],
        main: "./main.ts"
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
        return [autoprefixer];
    },
    sassLoader: {
        includePaths: ["./node_modules/materialize-css/sass"]
    },
    resolve: {
        extensions: ["", ".ts", ".js", ".scss"],
        modules: [
            path.resolve("./src"),
            "node_modules"
        ]
    },
    plugins: [
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
            publicPath: "",
            filename: "[name].js"
        },
        module: {
            loaders: [{
                test: /\.scss/,
                loader: ExtractTextWebpackPlugin
                    .extract("style", "css?sourceMap!postcss!resolve-url!sass?sourceMap")
            }]
        },
        plugins: [
            new ExtractTextWebpackPlugin("styles.css", { allChunks: true }),
            new OpenBrowserWebpackPlugin({
                url: "http://localhost:8080/"
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
            publicPath: "",
            filename: "[name].[chunkhash].js"
        },
        module: {
            loaders: [{
                test: /\.scss/,
                loader: ExtractTextWebpackPlugin
                    .extract("style", "css!postcss!resolve-url!sass?sourceMap")
            }]
        },
        plugins: [
            new ExtractTextWebpackPlugin("styles.[hash].css", { allChunks: true }),
            new CompressionWebpackPlugin({
                asset: "[path][file].gz[query]"
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
    return _.mergeWith(CONFIG_DEFAULT, CONFIG_TARGET[env.TARGET || "DEV"], concatArrays);
};

function concatArrays(a, b) {
    return _.isArray(a) ? _.concat(a, b) : undefined;
}
