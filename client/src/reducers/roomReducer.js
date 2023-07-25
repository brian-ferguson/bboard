import {SET_CLIENT_ID, SET_GAME_ID, SET_GAME_ROOM, SET_CONNECTION, CLEAR_ROOMS, GET_ROOMS} from '../actions/types';

const initialState = {
    clientId: "",
    gameRoom: [],
    connection: {},
    games: []
}

export default function userReducer(state = initialState, action, payload){
    switch(action.type){
        case SET_CLIENT_ID:
            return{
                ...state,
                clientId: action.payload
            };
        case SET_GAME_ID:
            return{
                ...state,
                gameId: action.payload
            }
        case SET_GAME_ROOM:
            return{
                ...state,
                gameRoom: [...action.payload]
            }
        case SET_CONNECTION:
            return{
                ...state,
                connection: action.payload
            }
        case CLEAR_ROOMS:
            return {
                ...state,
                gameRoom: []
            }
        case GET_ROOMS:
            return {
                ...state,
                games: action.payload
            }
        default:
            return state;
    }
}