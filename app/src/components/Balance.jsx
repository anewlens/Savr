import React, {useState} from 'react'
import { connect } from 'react-redux'

import { 
    selectBalance, 
    selectTransactions, 
    selectMonthlyBudgets, 
    selectTotalBudget, 
    selectTotalSpending 
    } from '../redux/account/account.selectors'
import { selectLoading } from '../redux/loading/loading.selectors'

import '../styles/Balance.scss'

import AddBox from './AddBox'
import {ReactComponent as AddButton} from '../images/svg/add-outline.svg'

const Balance = ({balance, totalBudget, totalSpending, loading}) => {
    
    const [addItemBox, openAddItemBox] = useState(false)

    const handleOpenItemBox = () => {
        openAddItemBox(!addItemBox)
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
                    <span className="Balance-amount">{loading ? '-' : totalBudget}</span>
                </div>
                <div className="Balance-item">
                    <span className="Balance-label">Spent</span>
                    <span className="Balance-amount">{loading ? '-' : totalSpending}</span>
                </div>
            </div>
            
            <button
                className="Balance-btn"
                onClick={handleOpenItemBox}>
                <AddButton />
            </button>

            {
                addItemBox ? <AddBox closeBox={handleOpenItemBox} /> : null
            }

        </section>
    )
}

const mapStateToProps = state => ({
    balance: selectBalance(state),
    transactions: selectTransactions(state),
    budgets: selectMonthlyBudgets(state),
    totalSpending: selectTotalSpending(state),
    totalBudget: selectTotalBudget(state),
    loading: selectLoading(state)
})

export default connect(mapStateToProps)(Balance)