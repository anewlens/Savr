import LoggedInActionTypes from './loggedIn.types'

const INITIAL_STATE = false

const loggedInReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LoggedInActionTypes.TOGGLE_LOGGED_IN:
            return !state
    
        default:
            return state
    }
}

export default loggedInReducer