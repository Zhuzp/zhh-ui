const path = require('path');
const webpack = require('webpack');
const webpackConfigBase = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');

function resolve(relatedPath) {
    console.log(__dirname)
    return path.join(__dirname, relatedPath)
}

const webpackConfigDev = {
    mode: 'development',

    entry: {
        app: [resolve('../src/index.tsx')],
    },

    output: {
        path: resolve('../dist'),
        filename: 'index.js',
    },

    devtool: 'eval-cheap-module-source-map',

    devServer: {
        hot: true,
        open: true,
        host: 'localhost',
        port: 3019,
    },

    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html', }),
    ]
}

module.exports = merge(webpackConfigBase, webpackConfigDev)

