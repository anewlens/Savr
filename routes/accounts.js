const accountRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Account = require('../models/account')
const User = require('../models/user')

const getTokenFrom = req => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

accountRouter.get('/', (req, res, next) => {
    const token = getTokenFrom(req)

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'Invalid or missing token.'})
        }

        Account
            .find({user: decodedToken.id})
            .then(accounts => {
                console.log(accounts)
                res.json(accounts[0])
            })
            .catch(err => next(err))
    } catch(exception) {
        next(exception)
    }
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
    const { date, amount, vendor, category, recurring } = req.body
    const token = getTokenFrom(req)

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'Invalid or missing token.'})
        }

        const account = await Account.findOne({ user: decodedToken.id })
        const transaction = {
            date,
            amount,
            vendor,
            category,
            recurring,
            user: decodedToken.id
        }
        
        const newBalance = account.currentBalance - amount

        account.transactions = account.transactions.concat(transaction)
        account.currentBalance = newBalance
        await account.save()
        
        res.json(transaction)
        } catch(exception) {
            next(exception)
        }
})

module.exports = accountRouter
