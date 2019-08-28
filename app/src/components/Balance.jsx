import React, {useState, useContext } from 'react'
import AccountContext from '../Context/Account'
import '../styles/Balance.scss'
import {currencyFormatter, budgetCalc, spendingCalc} from '../utils'

import AddBox from './AddBox'
import {ReactComponent as AddButton} from '../images/svg/add-outline.svg'

const Balance = ({loading, addTransaction}) => {
    
    const {account} = useContext(AccountContext)

    const [addItemBox, openAddItemBox] = useState(false)

    const handleOpenItemBox = () => {
        openAddItemBox(!addItemBox)
    }

    return (
        <section className="Balance">
            <div className="Balance-data">
                <div className="Balance-item">
                    <span className="Balance-label">Balance</span>
                    <span className="Balance-amount">{loading ? '-' : currencyFormatter.format(account.currentBalance)}</span>
                </div>
                <div className="Balance-item">
                    <span className="Balance-label">Budget</span>
                    <span className="Balance-amount">{loading ? '-' : budgetCalc(account.monthlyBudget)}</span>
                </div>
                <div className="Balance-item">
                    <span className="Balance-label">Spent</span>
                    <span className="Balance-amount">{loading ? '-' : spendingCalc(account.transactions)}</span>
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