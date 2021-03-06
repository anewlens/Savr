import React, {useState} from 'react'
import { connect } from 'react-redux'

import { selectMonthlyBudgets } from '../redux/account/account.selectors'
import { addTransaction } from '../redux/account/account.actions'

import accountServices from '../services/account'
import '../styles/AddBox.scss'

const AddBox = ({monthlyBudgets, closeBox, addTransaction}) => {

    const [vendor, setVendor] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [recurring, setRecurring] = useState(false)

    const handleVendor = e => setVendor(e.target.value)
    const handleAmount = e => setAmount(e.target.value)
    const handleCategory = e => setCategory(e.target.value)
    const handleRecurring = e => setRecurring(!recurring)

    const addItem = newTransaction => {
        accountServices
          .addTransaction(newTransaction)
          .then(async res => {
            await addTransaction(res)
          })
      }

      const handleSubmit = e => {
        e.preventDefault()
        
        if (vendor && amount && category) {
            addItem({
                date: new Date().toDateString(),
                amount: Number(amount),
                vendor,
                category,
                recurring
            })

            closeBox()
        }
    }


    return (
        <div className="AddBox">
            <h3 className="AddBox-title">Add Item</h3>
            <form onSubmit={handleSubmit} className='AddBox-form'>
                <input 
                    type="text" 
                    value={vendor}
                    onChange={handleVendor}
                    placeholder='Vendor'
                    className="AddBox-input inputVendor" />

                <input 
                    type="number" 
                    min="0.00"
                    step="0.01"
                    value={amount}
                    onChange={handleAmount}
                    placeholder='Amount'
                    className="AddBox-input inputAmount"/>
                
                <div className="AddBox-radios">
                    {monthlyBudgets.map(cat => {
                        return (
                            <span className='AddBox-radios-line'>
                                <label 
                                    htmlFor={cat.name} 
                                    className="AddBox-label">
                                        {cat.name}
                                </label>
                                <input type="radio"
                                    name="category" 
                                    id={cat.name}
                                    value={cat.name}
                                    onChange={handleCategory}
                                    className="AddBox-input inputCategory" />
                            </span>
                        )
                    })}
                    
                    <span className="AddBox-checkbox">
                        <label 
                            htmlFor="recurring" 
                            className="AddBox-label">
                            Recurring
                        </label>
                        <input
                            type='checkbox'
                            name='recurring'
                            id='recurring'
                            value='recurring'
                            onChange={handleRecurring}
                            className="Addbox-input inputRecurring"
                            />
                    </span>
                </div>
                
                <input value='Add' type='submit' className="AddBox-submit"  />
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    monthlyBudgets: selectMonthlyBudgets(state)
})

const mapDispatchToProps = dispatch => ({
    addTransaction: transaction => dispatch(addTransaction(transaction))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddBox)