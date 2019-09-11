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
                currentBalance: state.currentBalance - action.payload.amount,
                transactions: addTransaction(state.transactions, action.payload)
            }
        
        case AccountActionTypes.ADD_BUDGET:
            return {
                ...state,
                monthlyBudget: [...state.monthlyBudget, action.payload]
            }

        default:
            return state
    }
}

export default accountReducer