import UserActionTypes from './user.types'

const INITIAL_STATE = null

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_USER:
            return action.payload   
        default:
            return state
    }
}

export default userReducer