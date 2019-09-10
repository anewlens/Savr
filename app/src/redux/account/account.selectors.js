import { createSelector } from 'reselect'
import { currencyFormatter } from '../../utils'

export const selectAccount = state => state.account 

export const selectMonthlyBudgets = createSelector(
    [selectAccount],
    account => account.monthlyBudget
)

export const selectTotalBudget = createSelector(
    [selectMonthlyBudgets],
    budgets => 
        currencyFormatter
            .format(
                budgets
                    .map(i => i.amount)
                    .reduce((a,c) => a+c)
            )
)

export const selectTransactions = createSelector(
    [selectAccount],
    account => account.transactions 
)

export const selectTotalSpending = createSelector(
    [selectTransactions],
    transactions =>
        transactions.length < 1 
        ? '-'
        : currencyFormatter
            .format(
                transactions
                .map(item => item.amount)
                .reduce((a,c) => a+c)
            )
)

export const selectName = createSelector(
    [selectAccount],
    account => account.name
)

export const selectBalance = createSelector(
    [selectAccount],
    account => currencyFormatter.format(account.currentBalance)
)

export const selectIncome = createSelector(
    [selectAccount],
    account => currencyFormatter.format(account.income)
)