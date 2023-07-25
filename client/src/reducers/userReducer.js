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
    BUY_SPELL, 
    CLEAR_PACK,
    GET_PACKS,
    BUY_PACK,
    SET_LOADOUTS, 
    SAVE_LOADOUTS,
    GET_USER,
	SET_SELECTED_GAME,
    CLEAR_SPELLS
    } from '../actions/types';

const initialState = {
    spells: [],
    maxHealth: 2500,
    startingHealth: 2500,
    phase: "gameroom",
    maxShield: 3000,
    startingShield: 0,
    unlockedSpells: [],
    gold: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    packs: 0,
    packSpells: [],
    loadouts: [[], [], [], [], []],
    selectedLoadout: 0,
	selectedGame: ''
}

export default function userReducer(state = initialState, action, payload){
    switch(action.type){
        case GET_INFO:
            return {
                ...state,
                wins: action.payload.wins,
                losses: action.payload.losses,
                draws: action.payload.draws
            }
        case SET_INFO:
            switch(action.payload){
                case 'wins':
                    return {
                        ...state,
                        wins: state.wins + 1
                    }
                case 'losses':
                    return {
                        ...state,
                        losses: state.losses + 1
                    }
                case 'draws': 
                    return {
                        ...state,
                        draws: state.draws + 1
                    }
                default:
                    return state
            }
        case SET_SPELLS:
            return{
                ...state,
                spells: state.spells.concat(action.payload)
            };
        case REMOVE_SPELL:
            return {
                ...state,
                spells: state.spells.filter(spell => spell !== action.payload)
            }
        case SET_PHASE:
            return {
                ...state,
                phase: action.payload
            }
        case RESET_GAME:
            return {
                ...state,
                maxHealth: 2500,
                startingHealth: 2500,
                phase: "gameroom",
                maxShield: 3000,
                startingShield: 0
            }
        case GET_SPELLS:
            return{
                ...state,
                unlockedSpells: [...action.payload]
            }
        case GET_GOLD:
            return{
                ...state,
                gold: action.payload
            }
        case BUY_SPELL:
            return{
                ...state,
                gold: action.payload.gold,
                unlockedSpells: [...action.payload.spells]
            }
        case OPEN_PACK:
            return{
                ...state,
                gold: action.payload.gold,
                unlockedSpells: [...action.payload.spells],
                packSpells: [...action.payload.pack],
                packs: action.payload.packs
            }
        case CLEAR_PACK:
            return{
                ...state,
                packSpells:[]
            }
        case BUY_PACK:
            return {
                ...state,
                gold: action.payload.gold,
                packs: action.payload.packs
            }
        case GET_PACKS:
            return {
                ...state,
                packs: action.payload
            }
        case SET_LOADOUTS:
            return{
                ...state,
                loadouts: [...action.payload]
            }
        case SAVE_LOADOUTS:
            return{
                ...state,
                loadouts: [...action.payload]
            }
        case GET_USER:
            return{
                ...state,
                unlockedSpells: action.payload.unlockedSpells,
                gold: action.payload.gold,
                wins: action.payload.wins,
                losses: action.payload.losses,
                draws: action.payload.draws,
                packs: action.payload.packs,
                loadouts: action.payload.loadouts
            }
		case SET_SELECTED_GAME:
			return{
				...state,
				selectedGame: action.payload
			}
        case CLEAR_SPELLS:
            return{
                ...state,
                spells: []
            }
        default:
            return state;
    }
}