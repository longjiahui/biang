const path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

const webpack = require('webpack');

module.exports = {
    entry: {
        index: './src/page/index/index.js',
    },
//    mode: 'development',
    mode: 'production',
    devtool: 'inline-source-map',
//    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][hash].js'
    },
    module: {
        rules: [
            //eslint 启用时候 需要首先 eslint --init 初始化 eslint配置
//            {
//            enforce: "pre",
//            test: /\.js$/,
//            exclude: /node_modules/,
//            loader: "eslint-loader",
//            options: {
//                outputReport: {
//                    filePath: 'checkstyle.xml',
//                    formatter: require('eslint/lib/formatters/checkstyle')
//                }
//            }
//      },
            {
            test: /\.html$/,
            use: ['html-loader']
            }, {
            test: /\.(less|css)$/,
            use: ['style-loader', 'css-loader', {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    plugins: (loader) => [
//      require('postcss-import')({ root: loader.resourcePath }),
//      require('postcss-preset-env')(),
        require('autoprefixer')()
    ]
                }
}, 'less-loader'],
            }, {
            test: /\.(js|jsx)$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                },
            }]
    }, {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 4096,
                    name: 'img/[name].[hash].[ext]',
                    publicPath: '../'
                }
            }
            }],
    },
    plugins: [
        new cleanWebpackPlugin('./dist/*'),
        new htmlWebpackPlugin({
            template: './src/page/index/index.html',
            inject: true,
            filename: 'html/index.html',
            chuncks: ['index'],
        }),

        //热替换
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
};
