import React, {useState} from 'react'
import '../styles/AddBox.scss'

const AddBox = ({submit, closeBox}) => {

    const [vendor, setVendor] = useState('')
    const [amount, setAmount] = useState(null)
    const [category, setCategory] = useState(null)
    const [recurring, setRecurring] = useState(false)

    const handleVendor = e => setVendor(e.target.value)
    const handleAmount = e => setAmount(e.target.value)
    const handleCategory = e => setCategory(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()
        if (vendor && amount && category) {
            submit({
                date: new Date('July 17, 2019 16:24:00'),
                amount: Number(amount),
                vendor,
                category,
                recurring,
                userId: '5d3bd68e26889110b46023af'
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
                    <span className='AddBox-radios-line'>
                        <label 
                            htmlFor="shopping" 
                            className="AddBox-label">
                                Shopping
                        </label>
                        <input type="radio"
                            name="category" 
                            id='shopping'
                            value='shopping'
                            onChange={handleCategory}
                            className="AddBox-input inputCategory" />
                    </span>

                    <span className='AddBox-radios-line'>
                        <label 
                            htmlFor="entertainment" 
                            className="AddBox-label">
                                Entertainment
                        </label>
                                <input type="radio"
                                    name="category" 
                                    id='entertainment'
                                    value='entertainment'
                                    onChange={handleCategory}
                                    className="AddBox-input inputCategory" />
                    </span>

                    <span className='AddBox-radios-line'>
                        <label 
                            htmlFor="food" 
                            className="AddBox-label">
                                Food
                        </label>
                                <input type="radio"
                                    name="category" 
                                    id='food'
                                    value='food'
                                    onChange={handleCategory}
                                    className="AddBox-input inputCategory" />
                    </span>

                    <span className='AddBox-radios-line'>
                        <label 
                            htmlFor="rent" 
                            className="AddBox-label">
                                Rent
                        </label>
                                <input type="radio"
                                    name="category" 
                                    id='food'
                                    value='rent'
                                    onChange={handleCategory}
                                    className="AddBox-input inputCategory" />
                    </span>
                </div>

                
                <input value='Add' type='submit' className="AddBox-submit"  />
            </form>
        </div>
    )

}

export default AddBox