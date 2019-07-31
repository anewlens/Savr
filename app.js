const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')

const accountRouter = require('./routes/accounts')
const userRouter = require('./routes/users')

const errorHandler = require('./utils/middleware')

const mongoose = require('mongoose')


mongoose.connect(config.MONGO_URI, {useNewUrlParser: true})
        .then(() => {
            console.log('Now connected to MongoDB')
        })
        .catch(err => console.log('An error occurred connecting to MongoDB', err.message))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use('/account', accountRouter)
app.use('/user', userRouter)

app.use(errorHandler)

module.exports = app