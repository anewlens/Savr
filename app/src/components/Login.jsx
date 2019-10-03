import React, {useState} from 'react'
import { connect } from 'react-redux'

import loginServices from '../services/login'
import accountServices from '../services/account'
import userServices from '../services/user'

import { setAccount } from '../redux/account/account.actions'
import { setUser } from '../redux/user/user.actions'
import { toggleLoading } from '../redux/loading/loading.actions'

import '../styles/Login.scss'
import TextInput from './Inputs/testInput.component'
import PWInput from './Inputs/pwInput.component'

const Login = ({setUser, setAccount, history}) => {

    const [view, setView] = useState('login')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')

    const handleView = () => {
        view === 'login' && setView('create')
        view === 'create' && setView('login')
    }

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

    const handleCreateUser = async e => {
        e.preventDefault()
        console.log('Creating new user...')
        try {
            const user = {
                name,
                username,
                password
            }

            await userServices
                    .addUser(user)
                    .then(res => {
                        window.localStorage.setItem('LoggedInUser', JSON.stringify(res))
                        accountServices.setToken(res.token)
                        setUser(res)
                        history.push('/account-create')
                    })

        } catch(exception) {
            setErrorMessage('Invalid username/password')

            setTimeout(() => {
                setErrorMessage(null)
            }, 10000) 
        }
    }

    return (
        <div className="Login">
            <h1 className="Login-title">Savr</h1>
            <form onSubmit={view === 'login' ? handleLogin : handleCreateUser} className="Login-form">
            {
                view === 'create' && 
                    <TextInput
                        className="Login-form-name Login-input" 
                        onChange={e => setName(e.target.value)}
                        value={name} 
                        placeholder='name' />
            }
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

                {view === 'login' && <p className="testCredentials">Use 'test' and 'testpw' to see a mock account.</p>}

                {view === 'create' && 
                    <PWInput 
                        className="Login-form-confirmpw Login-input" 
                        onChange={e => setConfirmPassword(e.target.value)}
                        value={confirmPassword} 
                        placeholder='confirm password'/>}
                
                <p className="Login-error">{errorMessage}</p>

                <button className="Login-submit btn-lite">
                    {view === 'create' ? 'Next' : 'Log In'}
                </button>
            </form>

            <button className="Login-create" onClick={handleView}>
                {view === 'login' ? "Create an account" : 'Have an account?'}
            </button>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setAccount: account => dispatch(setAccount(account)),
    setUser: user => dispatch(setUser(user)),
    toggleLoading: () => dispatch(toggleLoading())
})

export default connect(null, mapDispatchToProps)(Login)