import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

const indexReducer = combineReducers({
    rootReducer,
});

export const Store = createStore(indexReducer, applyMiddleware(thunk));