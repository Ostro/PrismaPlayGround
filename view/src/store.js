import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import appReducers from './reducers';

const initialState = {};
const middlewares = [thunk];

const store = createStore(
  appReducers,
  initialState,
  compose(
    applyMiddleware(...middlewares)
  )
);

export default store;