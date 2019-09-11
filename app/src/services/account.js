import axios from 'axios'
const baseUrl = '/account'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAccount = async req => {
        await setToken(req.token)
        const config = {
            headers: { Authorization: token }
        }

        const request = axios.get(baseUrl, config)
        return request
            .then(response => {
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

const editBudget = async newBudget => {
    const config = {
        headers: { Authorization: token }
    }

    const res = await axios.put(`${baseUrl}/budget`, newBudget, config)
    return res.data
}

const editBalance = async newBalance => {
    const config = {
        headers: { Authorization: token }
    }

    const res = await axios.put(`${baseUrl}/balance`, newBalance, config)
    return res.data
}

const editIncome = async newIncome => {
    const config = {
        headers: { Authorization: token }
    }

    const res = await axios.put(`${baseUrl}/income`, newIncome, config)
    return res.data
}

const editName = async newName => {
    const config = {
        headers: { Authorization: token }
    }

    const res = await axios.put(`${baseUrl}/name`, newName, config)
    return res.data
}

export default {
    getAccount,
    addAccount,
    addTransaction,
    addBudget,
    editBudget,
    editBalance,
    editIncome,
    editName,
    setToken
}