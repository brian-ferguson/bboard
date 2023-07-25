import {SET_CLIENT_ID, SET_GAME_ID, SET_GAME_ROOM, SET_CONNECTION, CLEAR_ROOMS, GET_ROOMS} from './types';
import axios from 'axios';
import store from '../store';

let BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
let API_URL = `${BACKEND_URL}/api/`;

export const setClient = (clientId) => (dispatch) => {
    dispatch({
        type: SET_CLIENT_ID,
        payload:clientId
    })

}

export const setGame = (gameId) => (dispatch) => {
    dispatch({
        type: SET_GAME_ID,
        payload: gameId
    })
}

export const clearRooms = () => dispatch => {
    dispatch({ type: CLEAR_ROOMS })
}

export const setGameRoom = (game) => (dispatch) => {
    dispatch({
        type: SET_GAME_ROOM,
        payload: game.clients
    })
}

export const setConnection = (connection) => (dispatch) => {
    dispatch({
        type: SET_CONNECTION,
        payload: connection
    })
}

export const getRooms = () => (dispatch) => {
    axios.get(API_URL+'rooms')
        .then(res => dispatch({
            type: GET_ROOMS,
            payload: Object.values(res.data.games)       
        }))
}

export const deleteRoom = () => (dispatch) => {
    axios.delete(API_URL+'rooms/room/' + store.getState().room.gameRoom[0].gameId)
        .then(res => console.log("delete room res: ", res))
}