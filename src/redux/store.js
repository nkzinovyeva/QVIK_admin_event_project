import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import eventReducer from './reducers/eventReducer';
import stageReducer from './reducers/stageReducer';
import presenterReducer from './reducers/presenterReducer';

const rootReducer = combineReducers({
  eventReducer: eventReducer,
  stageReducer: stageReducer,
  presenterReducer: presenterReducer,
})

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;