import React from 'react';
import ReactDom from 'react-dom';
import Time from 'webpack2-module/src/components/TimeAsync';

require('./style.scss');

let rootEl = document.getElementById('root');
ReactDom.render(<Time />, rootEl);
