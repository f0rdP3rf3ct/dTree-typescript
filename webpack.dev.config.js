const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: './src/dTree.ts',
    devtool: 'inline-source-map',
    mode: "development",
    target: 'web',
    devServer: {
        static: {
            directory: path.join(__dirname, 'demo')
        },
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
    plugins: [new HtmlWebpackPlugin({
        template: "./src/demo/index.html"
    })],
    externals: {
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_',
        }
    }
};
