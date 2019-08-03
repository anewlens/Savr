import React, {useState, useEffect} from 'react'
import '../styles/Balance.scss'
import currencyFormatter from '../utils/CurrencyFormatter'

import AddBox from './AddBox'
import {ReactComponent as AddButton} from '../images/svg/add-outline.svg'

const Balance = ({balance, budget, spending, loading, addTransaction}) => {

    const [addItemBox, openAddItemBox] = useState(false)

    const handleOpenItemBox = () => {
        openAddItemBox(!addItemBox)
    }

    const budgetCalc = arr => 
        currencyFormatter.format(arr.map(i => i.amount).reduce((a,c) => a+c))

    const spendingCalc = spending => {
        console.log('spending', spending)
        return currencyFormatter.format(spending.map(item => item.amount).reduce((a,c) => a+c))
    }

    return (
        <section className="Balance">
            <div className="Balance-data">
                <div className="Balance-item">
                    <span className="Balance-label">Balance</span>
                    <span className="Balance-amount">{loading ? '-' : balance}</span>
                </div>
                <div className="Balance-item">
                    <span className="Balance-label">Budget</span>
                    <span className="Balance-amount">{loading ? '-' : budgetCalc(budget)}</span>
                </div>
                <div className="Balance-item">
                    <span className="Balance-label">Spent</span>
                    <span className="Balance-amount">{loading ? '-' : spendingCalc(spending)}</span>
                </div>
            </div>
            
            <button
                className="Balance-btn"
                onClick={handleOpenItemBox}>
                <AddButton />
            </button>

            {
                addItemBox ? <AddBox closeBox={handleOpenItemBox} submit={addTransaction} /> : null
            }

        </section>
    )
}

export default Balance