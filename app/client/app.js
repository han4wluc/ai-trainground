
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import store from './store';

import containers from './containers';


const Container = containers['home'];

// export default
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Container/>
        </div>
      </Provider>
    );
  }
}

render(
  <App/>,
  document.getElementById('root')
);
