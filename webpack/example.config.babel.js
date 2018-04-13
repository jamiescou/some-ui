import _ from 'lodash';
import baseConfig from './base.config';
let webpack = require('webpack');
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default _.extend({}, baseConfig, {
    devtool: false,
    entry: {
        ui: './site/index.js'
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        path: 'example/'
    },
    externals: {
     
    },
    plugins: [
        new webpack.DefinePlugin({
          "process.env": { 
             NODE_ENV: JSON.stringify("production") 
           }
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js')
    ],
    resolve: {
        extensions: ['', '.js', '.json', '.jsx'],
        modulesDirectories: ['node_modules']
    }
});
