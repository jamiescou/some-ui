import ReactDom from 'react-dom';
import React from 'react';
import App from './layout/app';

require('./styles/style.scss');
require('../src/styles/style.scss');
require('./js/pretty.js');

ReactDom.render(<App />, document.getElementById('mainWrapper'));
