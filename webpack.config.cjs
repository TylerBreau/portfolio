const path = require('path');

module.exports = {
    entry: './src/views/index.tsx',
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: 'app.js'
    },
    mode: 'development',
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.less'],
        alias: {
            '@Views': path.resolve(__dirname, './src/views'),
            '@Styles': path.resolve(__dirname, './src/styles'),
            '@Res': path.resolve(__dirname, './src/res'),
            '@Logic': path.resolve(__dirname, './src/logic'),
            '@Interfaces': path.resolve(__dirname, './src/interfaces')
        }
    },
    module: {
        rules: [
            {
                test: [
                    /(views).*\.tsx$/,
                    /(logic).*\.ts$/
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-typescript'],
                            ['@babel/preset-env', {targets: 'defaults'}],
                            ['@babel/preset-react', {runtime: 'automatic'}]
                        ]
                    }
                }
            },
            {
                test: /(styles).*\.less$/, use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /(res).*\.svg$/,
                type: 'asset/resource',
                exclude: [
                    /(views).*\.jsx$/,
                    /(logic).*\.ts$/,
                    /(styles).*\.less$/
                ]
            }
        ]
    }
};
