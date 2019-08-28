export const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

export const budgetCalc = arr => currencyFormatter.format(arr.map(i => i.amount).reduce((a,c) => a+c))

export const spendingCalc = spending => {
    if (spending.length < 1) {
        return '-'
    } else {
        return currencyFormatter.format(spending.map(item => item.amount).reduce((a,c) => a+c))
    }
}