import axios from 'axios';
import {returnErrors} from './errorActions';
import{
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERRORS
} from './types';

let BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
let API_URL = `${BACKEND_URL}/api/`;

console.log('url :',API_URL)

//Check token and load user
export const loadUser = () => (dispatch, getState) => {
    //User loading
    dispatch({type: USER_LOADING});

    //Fetch the user
    axios.get(API_URL+'auth/user', tokenConfig(getState))
        .then(res => 
          
            dispatch({
            type: USER_LOADED,
            payload: res.data
            
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};

//Register User
export const register = ({name, email, password, confirmPassword}) => dispatch => {
    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Request body
    const body = JSON.stringify({name, email, password, confirmPassword});

    axios.post(API_URL+'users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            });
        });

};

//Login User
export const login = ({email, password}) => dispatch => {
    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Request body
    const body = JSON.stringify({email, password});

    axios.post(API_URL+'auth', body, config)
        //dispatch to the authReducer
        .then(res => 
            
            dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }),
        
        dispatch({type: CLEAR_ERRORS})


        ).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });
        });

};

//Logout User
export const logout = () => {
    return{
        type: LOGOUT_SUCCESS
    }
}

//Set config/headers and token
export const tokenConfig = getState => {
    //Get token from local storage
    const token = getState().auth.token;
    //Headers
    const config = {
        headers:{
            "Content-type": "application/json"
        }
    }

    //If token exists add to headers
    if(token){
        config.headers['x-auth-token'] = token;
    }

    return config;
}