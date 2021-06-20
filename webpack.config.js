const path = require('path');
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// plugins: [new TsconfigPathsPlugin({})]

module.exports = {
    entry: './src/views/index.jsx',
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: 'app.js'
    },
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.less'],
        alias: {
            '@Views': path.resolve(__dirname, './src/views'),
            '@Styles': path.resolve(__dirname, './src/styles'),
            '@Res': path.resolve(__dirname, './src/res'),
            '@Logic': path.resolve(__dirname, './src/logic')
        }
    },
    module: {
        rules: [
            {
                test: /(views).*\.jsx$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: 'defaults' }]
                        ]
                    }
                }
            },
            {
                test: /(logic).*\.ts$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.json'
                    }
                }]
            },
            {
                test: /(styles).*\.less$/, use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: [/(res).*\.svg$/],
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
