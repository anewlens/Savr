const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
  name: String,
  currentBalance: Number,
  monthlyBudget: [
      {
          name: String,
          amount: Number
      }
  ],
  income: Number,
  transactions: [
      {
          date: Date,
          amount: Number,
          vendor: String,
          category: String,
          recurring: Boolean
      }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

accountSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Accounts', accountSchema)