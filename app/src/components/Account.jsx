import React from 'react'
import currencyFormatter from '../utils/CurrencyFormatter'
import Item from './Item.Account'
import '../styles/Account.scss'
import accountServices from '../services/account'

const Account = ({account}) => {

    const monthlyBudget = () => currencyFormatter.format(account.monthlyBudget.map(i => i.amount).reduce((a,c) => a+c))

    const editName= newName => {
        console.log('Editted Name')
    }

    const editIncome = newAmount => {
        console.log('Editted Income')
    }

    const editBalance = newAmount => {
        accountServices
            .editBalance(newAmount.includes('$') 
                        ? {newAmount: Number(newAmount.slice(1))} 
                        : {newAmount: Number(newAmount)})
    }

    return (
        <section className="Account container">
            <h1 className="Account-title container-title">Account</h1>
            <div className="Account-subContainer">
                <div className="Account-details">
                    <Item label='Name' data={account.name}  action={editName} />
                    <Item label='Income' data={account.income || 'Income not entered.'}  action={editIncome} />
                    <Item label='Monthly Budget' data={monthlyBudget()} />
                    <Item label='Balance' data={currencyFormatter.format(account.currentBalance)}  action={editBalance}/>
                </div>

                <div className="Account-recurring">
                    <h3 className="Account-recurring-title">Recurring Payments</h3>
                    {
                        account.transactions
                            .filter(item => item.recurring === true)
                            .map(item => <data className="Account-recurring-item"><label className='Account-label'>{item.vendor}:</label>{currencyFormatter.format(item.amount)}</data>)
                    } 
                </div>
            </div>
        </section>
    )
}

export default Account