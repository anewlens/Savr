import { combineReducers } from 'redux'
import {
    SET_ACCOUNT,
    SET_VIEW,
    SET_USER,
    TOGGLE_LOGGEDIN,
    TOGGLE_LOADING
} from './actions'

const account = (state = null, action) => {
    switch (action.type) {
        case SET_ACCOUNT:
            return action.account
        default:
            return state
    }
}

const view = (state = 'transactions', action) => {
    switch (action.type) {
        case SET_VIEW:
            return action.view
        default:
            return state
    }
}

const user = (state = null, action) => {
    switch (action.type) {
        case SET_USER:
            return action.user
        default:
            return state
    }
}

const loggedIn = (state = false, action) => {
    switch (action.type) {
        case TOGGLE_LOGGEDIN:
            return !state
        default:
            return state
    }
}

const loading = (state = true, action) => {
    switch (action.type) {
        case TOGGLE_LOADING:
            return !state    
        default:
            return state
    }
}

const savrApp = combineReducers({
    account,
    view,
    user,
    loggedIn,
    loading
})

export default savrApp