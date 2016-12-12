import React from 'react';

class AsyncComponent extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      component: null
    };
  }

  componentDidMount() {
    this.props.loader((componentModule) => {
      /* eslint-disable */
      this.setState({
        component: componentModule.default
      });
      /* eslint-enable */
    });
  }

  renderPlaceholder() {
    return (
      <div>
        Loading
      </div>
    );
  }

  render() {
    if (this.state.component) {
      return <this.state.component {...this.props}/>;
    }
    return (this.props.renderPlaceholder || this.renderPlaceholder)();
  }
}

AsyncComponent.displayName = 'AsyncComponent';

AsyncComponent.propTypes = {
  loader: React.PropTypes.func.isRequired,
  renderPlaceholder: React.PropTypes.func
};

AsyncComponent.defaultProps = {};

export default AsyncComponent;
