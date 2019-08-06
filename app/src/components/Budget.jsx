import React, {useState, useEffect} from 'react'
import PieChart from 'react-minimal-pie-chart'

import {ReactComponent as Rent} from '../images/svg/home.svg'
import {ReactComponent as Shopping} from '../images/svg/shopping-cart.svg'
import {ReactComponent as Food} from '../images/svg/location-food.svg'
import {ReactComponent as Entertainment} from '../images/svg/headphones.svg'
import currencyFormatter from '../utils/CurrencyFormatter'
import accountServices from '../services/account'

import '../styles/Budget.scss'

const Budget = ({account, show}) => {

    const [shouldRender, setRender] = useState(false)
    const [budgets, setBudgets] = useState(account.monthlyBudget)
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
                        ...budgets, newBudget
                    ])
                    setBudgetAmount('')
                    setBudgetName('')
                })
        }
    }

    useEffect(() => {
        console.log('budgets', budgets)
        console.log('transactions', account.transactions)
        if (show) {
            setTimeout(() => setRender(true), 200)
        };
      }, [show])

    const onAnimationEnd = () => {
        if (!show) setRender(false);
      }

    const categorySpending = categoryName => account.transactions.filter(item => item.category === categoryName)

    const chartData = budgets.map(category => {
            return {
                title: category.name,
                value: category.amount,
                color: category.name === 'shopping' 
                        ? 'var(--cyan)' 
                        : category.name === 'food'
                        ? 'var(--orange)'
                        : category.name === 'rent' 
                        ? 'var(--magenta)'
                        : category.name === 'entertainment'
                        ? 'var(--green)'
                        : '#eee'
            }
    })

    return (
        shouldRender && (
        <section 
            className="Budget container"
            style={{ animation: `${show ? "slideDown" : "slideUp"} .2s ease forwards`}}
            onAnimationEnd={onAnimationEnd}>
            <h1 className="Budget-title container-title">Budget</h1>
            <div className="Budget-main">
                <div className="BudgetPieChart">
                    <PieChart
                        data={chartData}
                        label={<Rent />}
                        labelStyle={{
                            fontFamily: 'Oswald',
                            height: '10px',
                            fill: 'white'
                        }}              
                        labelPosition={70}
                        className='BudgetPieChart-graph' />
                </div>
                <div className="Budget-data">
                    <header className="Budget-data-header">
                        <h3>Category</h3>
                        <h3>Budget</h3>
                        <h3>Spent</h3>
                    </header>

                    {budgets.map(category => {
                        if (categorySpending(category.name).length === 0) {
                            return null
                        }
                        return (
                            <div className="Budget-data-line">
                                <p className="Budget-data-category">{category.name}</p>
                                <p className="Budget-data-amount">{currencyFormatter.format(category.amount)}</p>
                                <p className="Budget-data-spent">
                                    {currencyFormatter.format(categorySpending(category.name)
                                        .map(item => item.amount)
                                        .reduce((a,c) => a+c))}
                                </p>
                            </div>
                        )
                    })}

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
            </div>
        </section>
        )
    )
}

export default Budget