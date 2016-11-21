
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import store from './store';

import containers from './containers';

import { Router, Route, IndexRoute, browserHistory, IndexRedirect } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const history = syncHistoryWithStore(browserHistory, store);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={containers['nav']}>
            <IndexRedirect to="/nnt" />
            <Route path="grid" component={containers['grid']}/>
            <Route path="nine" component={containers['nine']}/>
            <Route path="ttt" component={containers['ttt']}/>
            <Route path="border" component={containers['border']}/>
            <Route path="maze" component={containers['maze']}/>
            <Route path="mdp" component={containers['mdp']}/>
            <Route path="miniMaze" component={containers['miniMaze']}/>
            <Route path="nn" component={containers['nn']}/>
            <Route path="nnt" component={containers['nnt']}/>
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
