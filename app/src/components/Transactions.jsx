import React, {useEffect, useState} from 'react'
import '../styles/Transactions.scss'
import Item from './Item.Transactions'

const Transactions = ({transactions, loading, show}) => {

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
    
    return (
        shouldRender && (
            <section 
                className="Transactions container"
                style={{ animation: `${show ? "slideDown" : "slideUp"} .2s ease forwards`}}
                onAnimationEnd={onAnimationEnd}>
                <h1 className="Transactions-title container-title">July 2019</h1>
                {transactions.slice(0).reverse().map(item => <Item 
                                            vendor={item.vendor}
                                            amount={item.amount}
                                            date={item.date}
                                            category={item.category}
                                            recurring={item.recurring} />)}
            </section>
        )
    )
}

export default Transactions