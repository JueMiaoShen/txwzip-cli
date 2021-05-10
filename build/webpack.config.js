const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
    entry: './src/index.ts',
    target: "node",
    mode: "production",
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
        filename: 'index.min.js',
        path: path.resolve(__dirname,'../', 'dist'),
    },
    plugins: [
        // 清除dist文件夹
        new CleanWebpackPlugin(),
    ]
};
