import React, {useState} from 'react'
import '../styles/Login.scss'
import loginServices from '../services/login'
import accountServices from '../services/account'

const Login = ({loggedIn, setLoggedIn, user, setUser, setAccount, setLoading}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [balance, setBalance] = useState('')
    const [budgets, setBudgets] = useState('')
    const [income, setIncome] = useState('')

    const handleUsername = e => setUsername(e.target.value)
    const handlePassword = e => setPassword(e.target.value)

    const handleLogin = async e => {
        e.preventDefault()
        console.log('Attempting log in...')
        try {
            const user = await loginServices.login({username, password})
            await accountServices
                .getAccount(user)
                .then(res => {
                    console.log('user', user)
                    console.log('res', res)
                    window.localStorage.setItem('LoggedInUser', JSON.stringify(user))
                    setUser(user)
                    accountServices.setToken(user.token)
                    setAccount(res)
                    setLoading(false)
                })
        } catch(exception){
            console.log('exception', exception)
            setErrorMessage('Incorrect username or password.')
            setTimeout(() => {
                setErrorMessage(null)
            }, 10000)
        }
    }

    return (
        <div className="Login">
            <h1 className="Login-title">Savr</h1>
            <form onSubmit={handleLogin} className="Login-form">
                <input 
                    className="Login-form-username Login-input" 
                    type="text" 
                    onChange={handleUsername}
                    value={username} 
                    placeholder='username'/>

                <input 
                    className="Login-form-password Login-input" 
                    type="password" 
                    onChange={handlePassword}
                    value={password} 
                    placeholder='password'/>
                <p className="Login-error">{errorMessage}</p>
                <button className="Login-submit btn-lite">
                    Log in
                </button>

            </form>
        </div>
    )
}

export default Login