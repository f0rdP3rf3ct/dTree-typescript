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
        clean: true
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./src/demo/index.html"
    })],
};
