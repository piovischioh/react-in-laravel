import React from 'react'
import ReactDOM from 'react-dom'
import Msgboard from './components/Msgboard'
import reducers from "./reducers"
import { createStore, applyMiddleware } from "redux"
import { Provider } from 'react-redux'

// $.ajaxSetup({
//     headers: {
//         'X-CSRF-TOKEN': $('meta[id="_token"]').attr('content')
//     }
// });

const thunkMiddleware = ({ dispatch, getState }) => {
  return (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    return next(action);
  };
};

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <Msgboard />
  </Provider>,
  document.getElementById('app')
);
