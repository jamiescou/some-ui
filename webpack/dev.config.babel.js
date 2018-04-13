import _ from 'lodash';
import baseConfig from './base.config';

export default _.extend({}, baseConfig, {
    entry: {
        site: [
            `webpack-dev-server/client?http:\/\/localhost:8300`,
            'webpack/hot/dev-server',
            './site/index.js'
        ]
    },

    output: {
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        path: 'lib/',
        publicPath: '/_dist/'
    }
});
