import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import eventReducer from './reducers/eventReducer';
import stageReducer from './reducers/stageReducer';
import presenterReducer from './reducers/presenterReducer';
import linkReducer from "./reducers/linkReducer";

const rootReducer = combineReducers({
  eventReducer: eventReducer,
  stageReducer: stageReducer,
  presenterReducer: presenterReducer,
  linkReducer: linkReducer
})

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk, logger));

export default configureStore;