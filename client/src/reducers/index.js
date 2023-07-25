import {combineReducers} from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import roomReducer from './roomReducer';

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    user: userReducer,
    room: roomReducer
});