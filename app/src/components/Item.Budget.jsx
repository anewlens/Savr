import React, {useState} from 'react'
import currencyFormatter from '../utils/CurrencyFormatter'
import { ReactComponent as Edit } from '../images/svg/edit-pencil.svg'
import { ReactComponent as Check } from '../images/svg/checkmark.svg'

import accountServices from '../services/account'

const Item = ({category, categorySpending, setBudgets}) => {

    const [ edit, setEdit ] = useState(false)
    const [ name, setName ] = useState('')
    const [ amount, setAmount ] = useState('')
    
    const handleName = e => setName(e.target.value)
    const handleAmount = e => setAmount(e.target.value)
    const handleEdit = () => {
        if (!edit) {
            setEdit(!edit)
            setName(category.name)
            setAmount(category.amount)
        } else if (edit) {
            accountServices
                .editBudget({name, amount, id: category._id})
                .then(res => {
                    console.log('edit res', res)
                    setEdit(!edit)
                    setName(res.name)
                    setAmount(res.amount)
                })
        }
    }

    return (
        <div className="Budget-data-line">
            {
                edit 
                ? <input value={name} onChange={handleName} className='Budget-data-input Budget-data-category' />
                : <p className="Budget-data-category">{category.name}</p>
            }

            {
                edit 
                ? <input value={amount} onChange={handleAmount} className='Budget-data-input Budget-data-amount' />
                : <p className="Budget-data-amount">{currencyFormatter.format(category.amount)}</p>
            }
            
            <p className="Budget-data-spent">
                {currencyFormatter.format(categorySpending(category.name)
                    .map(item => item.amount)
                    .reduce((a,c) => a+c))}
            </p>
            <button onClick={handleEdit} className="Budget-data-edit">
                {
                    edit 
                    ? <Check className='Budget-data-svg' /> 
                    : <Edit className='Budget-data-svg' />
                }
            </button>
        </div>
    )
}

export default Item