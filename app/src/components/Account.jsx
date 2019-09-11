import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import {
        selectTransactions,
        selectBalance,
        selectIncome, 
        selectName, 
        selectTotalBudget} from '../redux/account/account.selectors'
import {currencyFormatter} from '../utils'

import accountServices from '../services/account'
import userServices from '../services/user'

import Item from './Item.Account'

import '../styles/Account.scss'

const Account = ({show, totalBudget, name, income, balance, transactions}) => {

    const [shouldRender, setRender] = useState(true)

    useEffect(() => {
        if (show) {
            setTimeout(() => setRender(true), 200)
        }
      }, [show])

    const onAnimationEnd = () => {
        if (!show) setRender(false);
    }
      
    const editName= newName => {
        userServices.editName({newName: newName})
        accountServices.editName({newName: newName})
    }

    const editBalance = newAmount => {
        accountServices
        .editBalance(newAmount.includes('$') 
        ? {newAmount: Number(newAmount.slice(1))} 
        : {newAmount: Number(newAmount)})
    }

    const editIncome = newAmount => {
        accountServices
        .editIncome(newAmount.includes('$') 
        ? {newAmount: Number(newAmount.slice(1))} 
        : {newAmount: Number(newAmount)})
    }

    return (
        shouldRender && (
            <section 
            className="Account container"
            style={{
                animation: `${show ? "slideDown" : "slideUp"} .2s ease forwards`,
                zIndex: `${show ? '10' : "100"}`
            }}
            onAnimationEnd={onAnimationEnd}>
            <h1 className="Account-title container-title">Account</h1>
            <div className="Account-subContainer">
                <div className="Account-details">
                    <Item label='Name' data={name}  action={editName} />
                    <Item label='Income' data={income}  action={editIncome} />
                    <Item label='Monthly Budget' data={totalBudget} />
                    <Item label='Balance' data={balance}  action={editBalance}/>
                </div>

                <div className="Account-recurring">
                    <h3 className="Account-recurring-title">Recurring Payments</h3>
                    {
                        transactions
                            .filter(item => item.recurring === true)
                            .map((item, i) => <data key={i} className="Account-recurring-item"><label className='Account-label'>{item.vendor}:</label>{currencyFormatter.format(item.amount)}</data>)
                    } 
                </div>
            </div>
        </section>
        )
    )
}

const mapStateToProps = state => ({
    totalBudget: selectTotalBudget(state),
    name: selectName(state),
    income: selectIncome(state),
    balance: selectBalance(state),
    transactions: selectTransactions(state)
})

export default connect(mapStateToProps)(Account)