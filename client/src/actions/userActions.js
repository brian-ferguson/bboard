import {
    SET_SPELLS, 
    SET_PHASE, 
    RESET_GAME, 
    REMOVE_SPELL, 
    GET_SPELLS, 
    SET_INFO, 
    GET_INFO, 
    GET_GOLD, 
    OPEN_PACK,
    BUY_PACK, 
    BUY_SPELL, 
    CLEAR_PACK,
    GET_PACKS,
    SET_LOADOUTS,
    SAVE_LOADOUTS,
    GET_USER,
    SET_SELECTED_GAME,
    CLEAR_SPELLS
    } from './types';
import axios from 'axios'
import store from '../store';
import { spells } from '../json/spells.json'

let BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
let API_URL = `${BACKEND_URL}/api/`;

export const getUser = () => (dispatch) => {
    axios.get(API_URL +'users/user/' + store.getState().auth.id)
    
        .then(res => dispatch({
            type: GET_USER,
            payload: res.data.user
        }))
        .catch(err => console.error(err))
        
}

//GET USER INFO
export const getUserInfo = (id) => (dispatch) => {
    axios.get(API_URL + 'users/userdata/' + id)
        .then(res => dispatch({
            type: GET_INFO,
            payload: res.data
        }))
        .catch(err => console.error(err))
}

//SET USER INFO
export const setUserInfo = (id, data) => dispatch => {
    axios.post(API_URL + 'users/setuserdata/' + id, {data: data})
        .then(() => dispatch({
            type: SET_INFO,
            payload: data
        }))
        .catch(err => console.error(err))
}

//RESET GAME
export const resetGame = () => (dispatch) => {
    dispatch({ type: RESET_GAME })
}

//SET PHASE
export const setPhase = (phase) => (dispatch) => {
    dispatch({
        type: SET_PHASE,
        payload: phase
    })
}

//REMOVE SPELL
export const removeSpell = (spell) => (dispatch) => {
    dispatch({
        type: REMOVE_SPELL,
        payload: spell
    })
}

//SET SPELLS
export const setSpells = (spell) => (dispatch) => {
    if(store.getState().user.spells.length < 6){
        dispatch({
            type: SET_SPELLS,
            payload: spell
        })
    }
}

//GET SPELLS
export const getSpells = (id) => (dispatch) => {
    axios.get(API_URL +'users/unlockedSpells/' + id)
        .then(res => 
            dispatch({
                type: GET_SPELLS,
                payload: res.data
            }))
}

export const openPack = () => (dispatch) => {
    if(store.getState().user.packs >= 1){
        axios.post(API_URL +'packs/openpack/' + store.getState().auth.id, { spells })
            .then(res => dispatch({
                type: OPEN_PACK,
                payload: res.data
            }))
    }
}

export const buySpell = (spell) => (dispatch) => {
        axios.post(API_URL +'users/buyspell/' + store.getState().auth.id, {'spell': spell})
            .then(res => dispatch({
                type: BUY_SPELL,
                payload: res.data
            }))
}

export const setGold = (id, amount) => (dispatch) => {
    axios.post(API_URL +'users/gold/' + id, {amount})
        .then(res => dispatch({
            type: GET_GOLD,
            payload: res.data
        }))
}

export const getGold = (id) => (dispatch) => {
    axios.get(API_URL +'users/gold/' + id)
        .then(res => dispatch({
            type: GET_GOLD,
            payload: res.data
        }))
}

export const clearPack = () => (dispatch) => {
    dispatch({
        type: CLEAR_PACK
    })
}

export const buyPack = item => dispatch => {
    axios.post(API_URL +'packs/buypacks/' + store.getState().auth.id, {item})
        .then(res => dispatch({
            type: BUY_PACK,
            payload: res.data
        }))
}

export const getPacks = () => dispatch => {
    axios.get(API_URL +'packs/getpacks/' + store.getState().auth.id)
        .then(res => dispatch({
            type: GET_PACKS,
            payload: res.data
        }))
}

export const setLoadouts = (loadouts) => (dispatch) => {
    dispatch({
        type:SET_LOADOUTS,
        payload: loadouts
    })
}

export const saveLoadouts = () => (dispatch) => {
    axios.post(API_URL +'users/saveloadouts/' + store.getState().auth.id, {"loadouts": store.getState().user.loadouts})
    .then(res => dispatch({
        type: SAVE_LOADOUTS,
        payload: res.data.loadouts
    })) 

}

export const setSelectedGame = (id) => dispatch => {
    dispatch({
        type: SET_SELECTED_GAME,
        payload: id
    })
}

export const clearSpells = () => (dispatch) => {
    dispatch({
        type: CLEAR_SPELLS
    })
}
