const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

const getTokenFrom = req => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

userRouter.post('/', async (req, res, next) => {
    try {
        const body = req.body
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        })

        const savedUser = await user.save()

        const userForToken = {
            username: savedUser.username,
            id: savedUser._id,
        }
    
        const token = jwt.sign(userForToken, process.env.SECRET)

        res
            .status(201)
            .send({
                token, 
                username: savedUser.username, 
                name: savedUser.name
            })

    } catch (exception) {
        next(exception)
    }
})

userRouter.put('/name', async (req, res, next) => {
    const { newName } = req.body
    const token = getTokenFrom(req)

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'Invalid ormissing token.'})
        }

        const user = await User.findOneAndUpdate(
            { _id: decodedToken.id },
            { name: newName },
            { new: true },
            err => console.log(err)
        )

        res.send(`Name changed to ${newName}.`)

    } catch(exception) {
        next(exception)
    }
})

module.exports = userRouter