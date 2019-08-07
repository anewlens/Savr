import React, {useState} from 'react'
import '../styles/AccountCreate.scss'

import accountServices from '../services/account'
import { ReactComponent as Plus } from '../images/svg/add-outline.svg'

const AccountCreate = ({user, setAccount, setLoading}) => {

    const [income, setIncome] = useState('')
    const [balance, setBalance] = useState('')
    const [budgets, setBudgets] = useState([])
    const [budgetName, setBudgetName] = useState('')
    const [budgetAmount, setBudgetAmount] = useState('')

    const handleIncome = e => setIncome(e.target.value)
    const handleBalance = e => setBalance(e.target.value)
    const handleBudgetName = e => setBudgetName(e.target.value)
    const handleBudgetAmount = e => setBudgetAmount(e.target.value)

    const handleBudgetAdd = e => {
        if (budgetName.length > 0 && budgetName.length > 0) {
            e.preventDefault()
            setBudgets(budgets.concat({name: budgetName, amount: Number(budgetAmount)}))
            setBudgetAmount('')
            setBudgetName('')
        }
    }

    const submitAccount = async e => {
        e.preventDefault()
        try {
            if (income.length > 0 && balance.length > 0 && budgets.length > 0) {
                const account = {
                    currentBalance: balance,
                    monthlyBudget: budgets,
                    income,
                    user
                }
                await accountServices
                        .addAccount(account)
                        .then(res => {
                            console.log('addAccount res', res)
                            setAccount(res)
                            setLoading(false)
                        })
            } 
        } catch(exception) {
            console.log('exception', exception)
        }
    }
    
    return (
        <div className="AccountCreate">
            <h1 className="AccountCreate-title">Savr</h1>
            <form onSubmit={submitAccount} className="AccountCreate-form">
                <div className="AccountCreate-form-1">
                    <input 
                        type="text" 
                        placeholder='Monthly Income' 
                        value={income} 
                        onChange={handleIncome} 
                        className="AccountCreate-form-income AccountCreate-form-input"/>
                    
                    <input 
                        type="text" 
                        placeholder='Current Balance' 
                        value={balance} 
                        onChange={handleBalance} 
                        className="AccountCreate-form-balance AccountCreate-form-input"/>
                </div>
                
                <div className="AccountCreate-form-budgets">
                    {budgets.length > 0 && budgets.map(cat => {
                        return (
                            <span className="AccountCreate-form-line">
                                <p className="AccountCreate-form-catName">{cat.name}</p>
                                <p className="AccountCreate-form-catAmount">{cat.amount}</p>
                            </span>
                        )
                    })}

                    <span className="AccountCreate-form-line">
                        <input 
                            type="text" 
                            placeholder='Budget Category' 
                            value={budgetName} 
                            onChange={handleBudgetName} 
                            className="AccountCreate-form-income AccountCreate-form-input"/>

                            <input 
                                type="number" 
                                placeholder='Budget Amount' 
                                value={budgetAmount} 
                                onChange={handleBudgetAmount} 
                                className="AccountCreate-form-income AccountCreate-form-input"/>

                        <button 
                            onClick={handleBudgetAdd} 
                            className="AccountCreate-form-addBudget">
                            Add
                        </button>
                    </span>
                </div>

                <button type="submit" className="AccountCreate-form-submit">Create Account</button>
            </form>
        </div>
    )
}

export default AccountCreate