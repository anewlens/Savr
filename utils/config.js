require("dotenv").config()

let PORT = process.env.PORT

let MONGO_URI = process.env.DATABASE

module.exports = {
  MONGO_URI,
  PORT,
}
