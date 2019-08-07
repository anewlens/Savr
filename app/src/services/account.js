import axios from 'axios'
const baseUrl = '/account'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAccount = async req => {
        console.log('getAccount req', req)
        await setToken(req.token)
        const config = {
            headers: { Authorization: token }
        }

        const request = axios.get(baseUrl, config)
        return request
            .then(response => {
                console.log('getAccount response', response)
                console.log('token', req.token)
                return response.data
            })
            .catch(err => console.log('err', err))
}

const addAccount = async newAccount => {
    await setToken(newAccount.user.token)
    const config = {
        headers: { Authorization: token }
    }

    const res = await axios.post(baseUrl, newAccount, config)
    return res.data
}

const addTransaction = async newTransaction => {
    const config = {
        headers: { Authorization: token }
    }

    const res = await axios.post(`${baseUrl}/transaction`, newTransaction, config)
    return res.data
}

const addBudget = async newBudget => {
    const config = {
        headers: { Authorization: token }
    }

    const res = await axios.post(`${baseUrl}/budget`, newBudget, config)
    return res.data
}

export default {
    getAccount,
    addAccount,
    addTransaction,
    addBudget,
    setToken
}