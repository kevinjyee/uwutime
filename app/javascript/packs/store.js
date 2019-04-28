import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

// import the root reducer
import rootReducer from './reducers/index';

// create an object for the default data

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;


