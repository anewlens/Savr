import { combineReducers } from 'redux'

import accountReducer from './account/account.reducer'
import userReducer from './user/user.reducer'
import loadingReducer from './loading/loading.reducer'

const rootReducer = combineReducers({
    account: accountReducer,
    user: userReducer,
    loading: loadingReducer,
})

export default rootReducer