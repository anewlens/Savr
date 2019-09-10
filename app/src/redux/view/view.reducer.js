import ViewActionTypes from './view.types' 

const INITIAL_STATE = 'transactions'

const viewReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ViewActionTypes.SET_VIEW:
            return action.payload
    
        default:
            return state
    }
}

export default viewReducer