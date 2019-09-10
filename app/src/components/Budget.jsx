import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { selectMonthlyBudgets, selectTransactions } from '../redux/account/account.selectors'
import Item from '../components/Item.Budget'

import accountServices from '../services/account'

import '../styles/Budget.scss'

const Budget = ({ monthlyBudgets, transactions, show}) => {

    const [shouldRender, setRender] = useState(false)
    const [budgets, setBudgets] = useState(monthlyBudgets)
    const [budgetName, setBudgetName ] = useState('')
    const [budgetAmount, setBudgetAmount ] = useState('')

    const handleNameChange = e => setBudgetName(e.target.value)
    const handleAmountChange = e => setBudgetAmount(e.target.value)

    const handleNewBudget = () => {
        if (budgetName.length > 0 && budgetAmount.length > 0) {
            const newBudget = {name: budgetName.toLowerCase(), amount: Number(budgetAmount)}
            accountServices
                .addBudget(newBudget)
                .then(async res => {
                    console.log('budgetRes', res)
                    await setBudgets([
                        ...monthlyBudgets, newBudget
                    ])
                    setBudgetAmount('')
                    setBudgetName('')
                })
        }
    }

    useEffect(() => {
        if (show) {
            setTimeout(() => setRender(true), 200)
        };
      }, [show])

    const onAnimationEnd = () => {
        if (!show) setRender(false);
      }

    const categorySpending = categoryName => transactions.filter(item => item.category === categoryName)

    return (
        shouldRender && (
        <section 
            className="Budget container"
            style={{
                animation: `${show ? "slideDown" : "slideUp"} .2s ease forwards`,
                zIndex: `${show ? '10' : "100"}`
            }}
            onAnimationEnd={onAnimationEnd}>

            <h1 className="Budget-title container-title">Budget</h1>

                <div className="Budget-data">
                    <header className="Budget-data-header">
                        <h3>Category</h3>
                        <h3>Budget</h3>
                        <h3>Spent</h3>
                    </header>

                    {
                        monthlyBudgets
                            .map(category => 
                                <Item 
                                    category={category} 
                                    categorySpending={categorySpending} 
                                    budgets={monthlyBudgets} />
                            )
                    }

                    <div className="Budget-data-line Budget-newCat">
                        <input 
                            type="text" 
                            placeholder='Add New' 
                            value={budgetName} 
                            onChange={handleNameChange} 
                            className="Budget-newCat-input"/>

                        <span className='Budget-newCat-span'>
                            <p>$</p>
                            <input 
                                type="number" 
                                placeholder='000' 
                                value={budgetAmount} 
                                onChange={handleAmountChange} 
                                className="Budget-newCat-input"/>
                        </span>

                        <button className="Budget-newCat-add" onClick={handleNewBudget}>Add</button>
                    </div>
                </div>

        </section>
        )
    )
}

const mapStateToProps = state => ({
    monthlyBudgets: selectMonthlyBudgets(state),
    transactions: selectTransactions(state)
})

export default connect(mapStateToProps)(Budget)