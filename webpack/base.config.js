import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    devtool: 'cheap-module-eval-source-map',

    output: {
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        path: 'lib/',
        publicPath: '/_dist/'
    },

    module: {
        noParse: /babel-core\/browser/,
        loaders: [{
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(jpe?g|png|gif|ogg|mp3)$/,
            exclude: [/lib/],
            loader: 'url-loader?limit=1&name=[sha512:hash:base64:7].[ext]'
        }, {
            test: /\.js$|.jsx$/,
            exclude: [/node_modules/, /lib/],
            loaders: ['react-hot', 'babel?cacheDirectory']
        }, {
            test: /\.css$|\.scss$/,
            include: [
                path.join(__dirname, '../site'),
                path.join(__dirname, '../src/styles')
            ],
            //            loader: ExtractTextPlugin.extract('style', 'css', 'postcss-loader'),
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
            //            loader: extractModuleCss.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader?outputStyle=expanded&includePaths[]=' + encodeURIComponent(path.join(__dirname, '../src/styles')))
        }, {
            test: /\.(ttf|eot|woff(?:2)?)(\?[a-z0-9]+)?$/,
            //test: /\.(ttf|eot|woff(?:2)?)\??.*$/,
            include: path.join(__dirname, '../src/styles'),
            loader: "url-loader?limit=10000&mimetype=application/font-woff"
        }, { // for svg
            test: /\.(svg?)(\?[a-z0-9]+)?$/,
            loader: "url-loader?limit=100000000"
        }]
    },

    postcss: () => [
        require('postcss-import'),
        require('autoprefixer'),
        require('precss'),
        require('postcss-calc'),
        require('postcss-each'),
        require('postcss-mixins'),
        require("postcss-selector-not"),
        require('postcss-nested')
    ],

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('[name].css')
    ],

    resolve: {
        extensions: ['', '.js', '.json', '.jsx'],
        modulesDirectories: ['node_modules', 'src']
    }
}