import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const createRootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        // rest of other reducers
    });

export default createRootReducer;
