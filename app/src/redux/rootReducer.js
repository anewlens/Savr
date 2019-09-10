import { combineReducers } from 'redux'

import accountReducer from './account/account.reducer'
import userReducer from './user/user.reducer'
import loggedInReducer from './loggedIn/loggedIn.reducer'
import loadingReducer from './loading/loading.reducer'

const rootReducer = combineReducers({
    account: accountReducer,
    user: userReducer,
    loggedIn: loggedInReducer,
    loading: loadingReducer
})

export default rootReducer