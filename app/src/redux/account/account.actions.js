import AccountActionTypes from './account.types'

export const getAccount = account => ({
    type: AccountActionTypes.SET_ACCOUNT,
    payload: account
})

export const addTransaction = transaction => ({
    type: AccountActionTypes.ADD_TRANSACTION,
    payload: transaction
})

export const addBudget = budget => ({
    type: AccountActionTypes.ADD_BUDGET,
    payload: budget
})