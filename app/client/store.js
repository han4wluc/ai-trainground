
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import * as reducers from './reducers';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
});
const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

export default store;

