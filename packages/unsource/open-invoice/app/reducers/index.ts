import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import databaseChoose from './databaseChoose';
import { History } from 'history';



export default function createRootReducer(history: History) {
    return combineReducers({
        databaseChoose,
        router: connectRouter(history),
    });
}
