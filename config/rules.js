const ExtractTextPlugin = require("extract-text-webpack-plugin");
const pxtorem = require("postcss-pxtorem");
const path = require("path");

module.exports = function (src) {
    let svgPath=[require.resolve('antd-mobile').replace(/warn\.js$/, ''),path.resolve(src, 'app/svg')];

    return {
        rules: [{
            test: /\.(js|jsx)$/,
            loader: "babel-loader",
            include: src,
            query: {
                compact: true
            }
        }, {
            test: /\.(png|jpg)$/,
            use: ["url-loader?limit=1000&name=[md5:hash:base64:10].[ext]"],
            include: src
        }, {
            test: /\.gif$/,
            loader: "file-loader?name=[name].[ext]",
            include: src
        }, {
            test: /\.(css|less)$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "postcss-loader",
                    options: {
                        plugins: [
                            require("autoprefixer")({
                                browsers: ["iOS >= 8", "Android >= 4"]
                            }),
                            pxtorem({
                                rootValue: 100,
                                propWhiteList: [],
                            })
                        ]
                    }
                }, {
                    loader: "less-loader",
                    // options: {
                    //     includePaths: [
                    //         src
                    //     ]
                    // }
                }]
            })
        }, {
            test: /\.(eot|woff|woff2|ttf|svg)/,
            exclude:svgPath,
            use: ["url-loader?name=[name].[hash].[ext]&limit=1024"]
        }, {
            test: /\.(svg)$/i,
            use: ['svg-sprite-loader'],
            include: svgPath
        }]
    };
};