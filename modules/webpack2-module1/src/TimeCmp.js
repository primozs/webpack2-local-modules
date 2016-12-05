import React, { PropTypes } from 'react';

class TimeCmp extends React.Component {
  render() {
    const { time } = this.props;
    return (
      <div>
        From TimeCmp: {time}
      </div>
    );
  }
}

TimeCmp.propTypes = {
  time: PropTypes.string
};

TimeCmp.defaultProps = {};

export default TimeCmp;
