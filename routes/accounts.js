const accountRouter = require('express').Router()
const Account = require('../models/account')
const User = require('../models/user')

accountRouter.get('/', (req, res) => {
    Account
        .find({})
        .then(accounts => {
            console.log(accounts)
            res.json(accounts)
        })
        .catch(err => next(err))
})

accountRouter.get('/:id', (req, res) => {
    const id = req.params.id
    const transaction = data.accounts.find(item => item.id == id)
    res.json(transaction)
})

accountRouter.post('/', async (req,res,next) => {
    const { currentBalance, monthlyBudget, income, userId } = req.body
    
    const user = await User.findById(userId)
    
    const account = new Account({
        name: user.name,
        currentBalance,
        monthlyBudget,
        income,
        transactions: [],
        user: user._id
    })

    try {
        const newAccount = await account.save()
        user.account = newAccount._id
        await user.save()
        res.json(newAccount.toJSON())
    } catch(exception) {
        next(exception)
    }
})


accountRouter.post('/transaction', async (req, res, next) => {
    const { date, amount, vendor, category, recurring, userId } = req.body
    const user = await User.findById(userId)
    const transaction = {
        date,
        amount,
        vendor,
        category,
        recurring
    }
    const newBalance = user.currentBalance - amount

    try {
        Account
            .updateOne(
                { user: user }, 
                { $push: { transactions: transaction } }
            )
            .then(() => res.json(transaction))
        } catch(exception) {
            next(exception)
        }
})

module.exports = accountRouter
