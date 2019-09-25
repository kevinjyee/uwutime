process.env.NODE_ENV = process.env.NODE_ENV || 'development'

var webpack = require('webpack');
var path = require('path');
const root = path.resolve(__dirname, '../../app/javascript/packs/');
// const environment = require('./environment')
//
// const extractText = environment.plugins.get('ExtractText')
// extractText.filename = '[name].js'
//
// module.exports = environment.toWebpackConfig()

const merge = require('webpack-merge')
const environment = require('./environment')


environment.loaders.append(
    'less', {
        test: /\.less$/,

        use: [


            {
                loader: 'style-loader',
            },
            {
                loader: 'css-loader',
            },
            {
                loader: 'less-loader',
                options: {
                    javascriptEnabled: true,
                },
            },
        ]
    },
    { test: /\.(jpe?g|png|gif)$/i, loader: 'url?limit=10000!img?progressive=true' },
    { test: /\.json/, loader: 'json-loader', exclude: /node_modules/ }
);

environment.config.merge({
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
    },
});

environment.plugins.append(
    'Provide',
    new webpack.NoEmitOnErrorsPlugin()
);


environment.plugins.append(
    'ContextReplacement',
    new webpack.NormalModuleReplacementPlugin(
        /node_modules\/antd\/lib\/style\/index\.less/,
        path.resolve(root, 'lib/less/antd-globals-hiding-hack.less')
    )
);


module.exports = environment.toWebpackConfig()


