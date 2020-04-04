import * as ActionTypes from '../actions/actionTypes'


const initialState = {
    photos: [],
    currentPage: 0,
    hasMoreItems: true,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SAVE_PHOTOS:
            return {
                ...state,
                photos: [...new Set([...state.photos, ...action.photos])],
                currentPage: action.currentPage,
                hasMoreItems: action.hasMoreItems,
            }
        
        case ActionTypes.SAVE_NO_PHOTOS:
            return {
                ...state,
                photos: [...new Set([...state.photos, ...action.photos])],
                hasMoreItems: action.hasMoreItems,
            }

        case ActionTypes.CLEAR_SOL_PHOTOS:
            return {
                ...state,
                photos: [],
                currentPage: 0,
                hasMoreItems: false
            }
        
        case ActionTypes.SAVE_SOL_PHOTOS:
            return {
                ...state,
                photos: [...action.photos],
                hasMoreItems: action.hasMoreItems,
                currentPage: 1,
            }

        case ActionTypes.SAVE_NO_SOL_PHOTOS:
            return {
                ...state,
                photos: [],
                hasMoreItems: action.hasMoreItems,
                currentPage: 0,
            }
        
        default: return state
    }
}


export default reducer