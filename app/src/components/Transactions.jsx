import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { selectTransactions } from '../redux/account/account.selectors'
import { selectLoading } from '../redux/loading/loading.selectors'
import '../styles/Transactions.scss'
import Item from './Item.Transactions'

const Transactions = ({loading, transactions}) => {
    const currentDate = new Date()
    
    return (
        <section className="Transactions container">
            <h1 className="Transactions-title container-title">{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h1>
            {
                transactions
                    .slice(0)
                    .reverse()
                    .map((item, i) => <Item 
                                    key={i}
                                    vendor={item.vendor}
                                    amount={item.amount}
                                    date={item.date}
                                    category={item.category}
                                    recurring={item.recurring} />)
            }
        </section>
    )
}

const mapStateToProps = state => ({
    transactions: selectTransactions(state),
    loading: selectLoading(state)
})

export default connect(mapStateToProps)(Transactions)