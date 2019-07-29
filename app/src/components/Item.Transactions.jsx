import React from 'react'

import currencyFormatter from '../utils/CurrencyFormatter'

import {ReactComponent as Rent} from '../images/svg/home.svg'
import {ReactComponent as Shopping} from '../images/svg/shopping-cart.svg'
import {ReactComponent as Food} from '../images/svg/location-food.svg'
import {ReactComponent as Entertainment} from '../images/svg/headphones.svg'
import {ReactComponent as Recurring} from '../images/svg/refresh.svg'

const Item = ({date, amount, vendor, category, recurring}) => {
    
    return (
        <div className="Transactions-item">
            <div className="Transactions-item-left">
                <div 
                    className="Transactions-item-icon"
                    style={{
                        backgroundColor: category === 'rent' ? 'var(--magenta)' : category === 'shopping' ? 'var(--cyan)' : category === 'food' ? 'var(--orange)' : category === 'entertainment' ? 'var(--green)' : 'var(--background-light)'}}>
                    {category === 'rent' && <Rent
                        className='Transactions-item-svg icon-rent' />}
                    
                    {category === 'shopping' && <Shopping
                        className='Transactions-item-svg icon-shopping' />}
                    
                    {category === 'food' && <Food
                        className='Transactions-item-svg icon-food' />}

                    {category === 'entertainment' && <Entertainment
                        className='Transactions-item-svg icon-food' />}
                </div>
                
                <div className="Transactions-item-info">
                    <h3 className="Transactions-item-vendor">{vendor}</h3>
                    <p className="Transactions-item-date">{date}</p>
                </div>
            </div>

            <div className="Transactions-item-right">
            {recurring ? <div className="Transactions-item-icon"><Recurring className='icon-recurring'/></div> : null}
                <h3 className="Transactions-item-amount">{currencyFormatter.format(amount)}</h3>
            </div>
             
        </div>
    )
}

export default Item