import { combineReducers } from 'redux'

import accountReducer from './account/account.reducer'
import userReducer from './user/user.reducer'
import loadingReducer from './loading/loading.reducer'
import viewReducer from './view/view.reducer'

const rootReducer = combineReducers({
    account: accountReducer,
    user: userReducer,
    loading: loadingReducer,
    view: viewReducer
})

export default rootReducer