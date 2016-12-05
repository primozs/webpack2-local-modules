import TimeCmp from 'webpack2-module1/src/TimeCmp';
import React from 'react';
import getTime from '../getTime';

require('../scss/module.scss');

class Time extends React.Component {
  render() {
    const time = getTime();

    return (
      <div className="time">
        From time: {time}
        <TimeCmp time={time} />
      </div>
    );
  }
}

Time.propTypes = {};
Time.defaultProps = {};

export default Time;
