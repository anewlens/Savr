import LoadingActionTypes from './loading.types' 

const INITAL_STATE = true

const loadingReducer = (state = INITAL_STATE, action) => {
    switch (action.type) {
        case LoadingActionTypes.TOGGLE_LOADING:
            return !state
    
        default:
            return state
    }
}

export default loadingReducer