const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const webpackConfigBase = require('./webpack.base');
const TerserJSPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');

function resolve(relatedPath) {
    return path.join(__dirname, relatedPath)
}

const webpackConfigProd = {
    mode: 'production',

    entry: {
        app: [resolve('../src/components/index.ts')],
    },

    output: {
        filename: 'index.js',
        path: resolve('../lib'),
        libraryTarget: 'commonjs2',
    },

    devtool: 'source-map',  //或使用'cheap-module-source-map'、'none'
    optimization: {
        minimizer: [
            // 压缩js代码
            new TerserJSPlugin({// 多进程压缩
                parallel: 4,// 开启多进程压缩
                terserOptions: {
                    compress: {
                        drop_console: true,   // 删除所有的 `console` 语句
                    },
                },
            }),
        ],
    },
    externalsPresets: { node: true },
    externals: [nodeExternals()],

    plugins: [
        new CleanWebpackPlugin() //每次执行都将清空一下目录
    ]
}
module.exports = merge(webpackConfigBase, webpackConfigProd)

