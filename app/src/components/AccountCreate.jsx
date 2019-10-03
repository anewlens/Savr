import React, {useState} from 'react'
import {connect} from 'react-redux'

import { setAccount } from '../redux/account/account.actions'
import { selectUser } from '../redux/user/user.selectors'
import { toggleLoading } from '../redux/loading/loading.actions'

import '../styles/AccountCreate.scss'

import accountServices from '../services/account'
import TextInput from './Inputs/testInput.component'

const AccountCreate = ({user, setAccount, history}) => {

    const [income, setIncome] = useState('')
    const [balance, setBalance] = useState('')
    const [budgets, setBudgets] = useState([])
    const [budgetName, setBudgetName] = useState('')
    const [budgetAmount, setBudgetAmount] = useState('')

    const handleBudgetAdd = e => {
        if (budgetName.length > 0 && budgetName.length > 0) {
            e.preventDefault()
            setBudgets(budgets.concat({name: budgetName.toLowerCase(), amount: Number(budgetAmount)}))
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
                            history.push('/')
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
                    <TextInput
                        placeholder='Monthly Income' 
                        value={income} 
                        onChange={e => setIncome(e.target.value)} 
                        className="AccountCreate-form-income AccountCreate-form-input" />
                    
                    <TextInput 
                        placeholder='Current Balance' 
                        value={balance} 
                        onChange={e => setBalance(e.target.value)} 
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
                        <TextInput 
                            placeholder='Budget Category' 
                            value={budgetName} 
                            onChange={e => setBudgetName(e.target.value)} 
                            className="AccountCreate-form-income AccountCreate-form-input"/>

                            <input 
                                type="number" 
                                placeholder='Budget Amount' 
                                value={budgetAmount} 
                                onChange={e => setBudgetAmount(e.target.value)} 
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

const mapStateToProps = state => ({
    user: selectUser(state)
  })

const mapDispatchToProps = dispatch => ({
    setAccount: account => dispatch(setAccount(account)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountCreate)