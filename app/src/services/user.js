import axios from 'axios'
const baseUrl = '/user'

const addUser = async newUser => {
    const res = await axios.post(baseUrl, newUser)
    return res.data
}

export default {
    addUser
}