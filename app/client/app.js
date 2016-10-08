
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import store from './store';

import containers from './containers';

import { Router, Route, IndexRoute, browserHistory, IndexRedirect } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const history = syncHistoryWithStore(browserHistory, store);

// const Container = containers['home'];
// const Container = containers['nine'];
// const Container = containers['ttt'];

// export default
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={containers['nav']}>
            <IndexRedirect to="/ttt" />
            <Route path="grid" component={containers['home']}/>
            <Route path="nine" component={containers['nine']}/>
            <Route path="ttt" component={containers['ttt']}/>
            <Route path="border" component={containers['border']}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}

render(
  <App/>,
  document.getElementById('root')
);
