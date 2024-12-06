const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
    entry: './src/dTree.ts',
    devtool: 'inline-source-map',
    mode: "development",
    target: 'web',
    devServer: {
        compress: true,
        port: 9100
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'dTree.js',
        path: path.resolve(__dirname, 'demo'),
        clean: true,
        globalObject: 'this',
        library: {
            export: 'default',
            name: 'dTree',
            type: 'umd'
        }
    },
    plugins: [
        new CopyPlugin({patterns: [{from: './src/demo/data.json', to: path.resolve(__dirname, 'demo')}]}),
        new HtmlWebpackPlugin({template: "./src/demo/index.html"})
    ],
    externals: {
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_',
        },
        d3: 'd3'
    }
};
