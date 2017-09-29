const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const OpenBrowserPlugin = require('open-browser-webpack-plugin'); //自动打开浏览器插件
const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (isProd, build) => {
    let plugins = [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, `../web/app/db/*.json`),
            to: path.resolve(build, './data/'),
            toType: "dir",
            flatten: true
        }]),
        new webpack.HashedModuleIdsPlugin(), // 引入该插件
        new HtmlWebpackPlugin({
            filename: path.resolve(build, "index.html"),
            title: "House2",
            template: path.resolve(__dirname, "../web/temp.html"),
            chunks: ["vendor", "app"],
            hash: true, //为静态资源生成hash值
            minify: { //压缩HTML文件    
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: true //删除空白符与换行符
            }
        }),
        new OptimizeCssAssetsPlugin({}),
        new ExtractTextPlugin("[name].[chunkhash].css"),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(isProd ? "production" : "development")
            },
            __DEV__: !isProd
        })
    ];
    if (isProd) {
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                output: {
                    comments: false // remove all comments
                },
                compress: {
                    warnings: false
                }
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new BundleAnalyzerPlugin()
        );

    } else {
        plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new OpenBrowserPlugin({ url: 'http://localhost:3344', browser: "chrome" })
        )
    }
    return plugins;
};