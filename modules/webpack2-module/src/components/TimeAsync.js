if (typeof require.ensure === 'undefined') {
  const requireEnsure = require('seeyou-core/src/utils/requireEnsure');
  requireEnsure(require);
}

import React from 'react';
import AsyncComponent from './AsyncComponent';
import scheduleLoad from './scheduleLoad';

const loader = (cb) => {
  System.import('./Time').then((Time) => {
    cb(Time);
  });
};

// if (process.env.CLIENT) {
//   scheduleLoad(loader);
// }

const TimeAsync = (props) => {
  return (
    <AsyncComponent {...props} loader={loader}/>
  );
};

TimeAsync.displayName = 'TimeAsync';

export default TimeAsync;
