const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const accountSchema = new mongoose.Schema({
  name: String,
  currentBalance: Number,
  monthlyBudget: [
    {
      name: String,
      amount: Number,
    },
  ],
  income: Number,
  transactions: [
    {
      date: Date,
      amount: Number,
      vendor: String,
      category: String,
      recurring: Boolean,
    },
  ],
})

const Account = mongoose.model("Account", accountSchema)

const account = new Account({
  name: "Joe Smith",
  currentBalance: 14292.32,
  monthlyBudget: [
    {
      name: "food",
      amount: 300,
    },
    {
      name: "rent",
      amount: 900,
    },
    {
      name: "shopping",
      amount: 100,
    },
    {
      name: "entertainment",
      amount: 120,
    },
  ],
  income: 2500,
  transactions: [
    {
      date: "July 17, 2019 16:24:00",
      amount: 59.3,
      vendor: "J. Crew",
      category: "shopping",
      recurring: false,
    },
    {
      date: "July 12, 2019 12:34:21",
      amount: 32.12,
      vendor: "Secret Sandwich Society",
      category: "food",
      recurring: false,
    },
    {
      date: "July 5, 2019 10:01:00",
      amount: 5.39,
      vendor: "Starbucks",
      category: "food",
      recurring: false,
    },
    {
      date: "July 1, 2019 8:00:00",
      amount: 900,
      vendor: "Hammermill Apartments",
      category: "rent",
      recurring: true,
    },
    {
      date: "July 1, 2019 7:00:00",
      amount: 10,
      vendor: "Apple Music",
      category: "entertainment",
      recurring: true,
      id: "7653",
    },
    {
      date: "July 1, 2019 6:00:00",
      amount: 12,
      vendor: "Netflix",
      category: "entertainment",
      recurring: true,
    },
    {
      date: "July 1, 2019 8:00:00",
      amount: 10,
      vendor: "Google Stadia",
      category: "entertainment",
      recurring: true,
    },
  ],
})

account.save().then((res) => {
  console.log("Account logged")
  mongoose.connection.close()
})

// Account
//     .find({})
//     .then(res => {
//         res.forEach(account => {
//             console.log(account)
//         })
//     mongoose.connection.close()
//   })
