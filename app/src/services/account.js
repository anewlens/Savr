import axios from 'axios'
const baseUrl = '/account'

const getAccount = () => axios.get(baseUrl)

const addTransaction = newTransaction => axios.post(`${baseUrl}/transaction`, newTransaction)
export default {
    getAccount,
    addTransaction
}