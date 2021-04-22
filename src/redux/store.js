import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import eventReducer from './reducers/eventReducer';

const rootReducer = combineReducers({
  eventReducer: eventReducer,
})

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;