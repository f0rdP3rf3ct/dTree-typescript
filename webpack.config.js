const path = require('path');

module.exports = {
    entry: './src/dTree.ts',
    devtool: 'inline-source-map',
    mode: "development",
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
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
};
