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
        console.log('id', decodedToken.id)
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
    const { currentBalance, monthlyBudget, income } = req.body
    const token = getTokenFrom(req)
    
    try {
        const decodedToken = await jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'Invalid or missing token.'})
        }

        console.log('newAccount user', decodedToken)
        
        const getUser = await User.findById(decodedToken.id)
        const account = new Account({
            name: getUser.name,
            currentBalance,
            monthlyBudget,
            income,
            transactions: [],
            user: decodedToken.id
        })
    
        const newAccount = await account.save()
        getUser.account = newAccount._id
        await getUser.save()
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

accountRouter.post('/budget', async (req, res, next) => {
    const { name, amount } = req.body
    const token = getTokenFrom(req)

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'Invalid ormissing token.'})
        }

        const account = await Account.findOne({ user: decodedToken.id })
        const category = {
            name,
            amount
        }

        account.monthlyBudget = account.monthlyBudget.concat(category)
        await account.save()

        res.json(category)
    } catch(exception) {
        next(exception)
    }
})

module.exports = accountRouter
