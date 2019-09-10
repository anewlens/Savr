import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { selectTransactions } from '../redux/account/account.selectors'
import '../styles/Transactions.scss'
import Item from './Item.Transactions'

const Transactions = ({loading, show, transactions}) => {


    const [shouldRender, setRender] = useState(true)

    useEffect(() => {
        if (show) {
            setTimeout(() => setRender(true), 200)
        }
    }, [show]);

      const onAnimationEnd = () => {
        if (!show) setRender(false);
      };

    if (loading || !shouldRender) {
        return null
    }
    
    const currentDate = new Date()

    return (
        shouldRender && (
            <section 
                className="Transactions container"
                style={{
                    animation: `${show ? "slideDown" : "slideUp"} .2s ease forwards`,
                    zIndex: `${show ? '10' : "100"}`
                }}
                onAnimationEnd={onAnimationEnd}>
                <h1 className="Transactions-title container-title">{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h1>
                {
                    transactions
                        .slice(0)
                        .reverse()
                        .map(item => <Item 
                                        key={item.id}
                                        vendor={item.vendor}
                                        amount={item.amount}
                                        date={item.date}
                                        category={item.category}
                                        recurring={item.recurring} />)
                }
            </section>
        )
    )
}

const mapStateToProps = state => ({
    transactions: selectTransactions(state)
})

export default connect(mapStateToProps)(Transactions)