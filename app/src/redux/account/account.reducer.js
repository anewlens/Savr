import AccountActionTypes from './account.types'
import { addTransaction } from './account.utils'

const INITIAL_STATE = null

const accountReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AccountActionTypes.SET_ACCOUNT:
            return {...action.payload}
        
        case AccountActionTypes.ADD_TRANSACTION:
            return {
                ...state,
                transactions: addTransaction(state.account.transactions, action.payload)
            }
        default:
            return state
    }
}

export default accountReducer