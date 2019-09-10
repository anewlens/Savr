export const addTransaction = (transactions, newTransaction) => {
    return [...transactions, {newTransaction}]
}