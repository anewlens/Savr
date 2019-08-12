import React from 'react'
import currencyFormatter from '../utils/CurrencyFormatter'
import '../styles/Account.scss'

const Account = ({account}) => {

    const monthlyBudget = () => currencyFormatter.format(account.monthlyBudget.map(i => i.amount).reduce((a,c) => a+c))

    return (
        <section className="Account container">
            <h1 className="Account-title container-title">Account</h1>
            <div className="Account-subContainer">
                <div className="Account-details">
                    <span className="Account-details-line"><label className='Account-label'>Name:</label> <data className="Account-details-data">{account.name}</data></span>
                    <span className="Account-details-line"><label className='Account-label'>Income:</label> <data className="Account-details-data">{account.income || 'Income not entered.'}</data></span>
                    <span className="Account-details-line"><label className='Account-label'>Monthly Budget:</label> <data className='Account-details-data'>{monthlyBudget()}</data></span>
                    <span className="Account-details-line"><label className='Account-label'>Monthly Budget:</label> <data className="Account-details-data">{monthlyBudget()}</data></span>
                </div>

                <div className="Account-recurring">
                    <h3 className="Account-recurring-title">Recurring Payments</h3>
                    {
                        account.transactions
                            .filter(item => item.recurring === true)
                            .map(item => <data className="Account-recurring-item"><label className='Account-label'>{item.vendor}:</label> {currencyFormatter.format(item.amount)}</data>)
                    } 
                </div>
            </div>
        </section>
    )
}

export default Account