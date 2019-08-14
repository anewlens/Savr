import axios from 'axios'
const baseUrl = '/user'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const addUser = async newUser => {
    const res = await axios.post(baseUrl, newUser)
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
    addUser,
    editName,
    setToken
}