import _ from 'lodash';
import baseConfig from './base.config';

export default _.extend({}, baseConfig, {
    entry: {
        ui: './src/index.js'
    },

    output: {
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        path: 'lib/'
    }
});
