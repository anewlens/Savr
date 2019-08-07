const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

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

module.exports = userRouter