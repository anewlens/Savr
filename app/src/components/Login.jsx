import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import loginServices from '../services/login'
import accountServices from '../services/account'

import { setAccount } from '../redux/account/account.actions'
import { setUser } from '../redux/user/user.actions'

import TextInput from './Inputs/testInput.component'
import PWInput from './Inputs/pwInput.component'

import '../styles/Login.scss'

const Login = ({setUser, setAccount, history}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    const handleLogin = async e => {
        e.preventDefault()

        try {
            const user = await loginServices.login({username, password})

            await accountServices
                .getAccount(user)
                .then(res => {
                    window.localStorage.setItem('LoggedInUser', JSON.stringify(user))
                    setUser(user)
                    accountServices.setToken(user.token)
                    setAccount(res)
                    history.push('/')
                })

        } catch(exception){
            setErrorMessage('Incorrect username or password.')

            setTimeout(() => {setErrorMessage(null)}, 10000)
        }
    }

    return (
        <div className="Login">
            <h1 className="Login-title">Savr</h1>
            <form onSubmit={handleLogin} className="Login-form">

                <TextInput 
                    className="Login-form-username Login-input" 
                    onChange={e => setUsername(e.target.value)}
                    value={username} 
                    placeholder='username'/>

                <PWInput 
                    className="Login-form-password Login-input" 
                    onChange={e => setPassword(e.target.value)}
                    value={password} 
                    placeholder='password' />

                <p className="testCredentials">Use 'test' and 'testpw' to see a mock account.</p>
                
                <p className="Login-error">{errorMessage}</p>

                <button className="Login-submit btn-lite">
                    Log In
                </button>
            </form>

            <Link to='/account-create' className="Login-create">Create an Account</Link>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setAccount: account => dispatch(setAccount(account)),
    setUser: user => dispatch(setUser(user)),
})

export default connect(null, mapDispatchToProps)(Login)