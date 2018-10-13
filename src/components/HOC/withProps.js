import React, {Component, createContext} from 'react';

const {Provider, Consumer} = createContext();

const withProps = (Enhanceable) => 
   class WithProps extends Component {
    render() {
      return (
        <Consumer>
          {
            context => <Enhanceable {...context} {...this.props} />
          }
        </Consumer>
      )
    }
  }

export {
  Provider,
  Consumer,
  withProps
};