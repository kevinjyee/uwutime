const HtmlWebPackPlugin = require("html-webpack-plugin");
import ExtractTextPlugin from 'extract-text-webpack-plugin';
const PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass?outputStyle=expanded',
            },
            {
                test: /antd.*\.less$/,
                ...(PRODUCTION ? {
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader?importLoaders=1', 'postcss-loader', 'less-loader']
                    })
                } : {
                    use: [
                        "style-loader",
                        {
                            loader: 'css-loader',
                            options: {sourceMap: 1}
                        },
                        "postcss-loader",
                        "less-loader"
                    ]
                } )
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
};


