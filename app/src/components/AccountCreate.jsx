import React, {useState} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import accountServices from '../services/account'
import userServices from '../services/user'

import { setUser } from '../redux/user/user.actions'
import { toggleLoading } from '../redux/loading/loading.actions'

import TextInput from './Inputs/testInput.component'
import PWInput from './Inputs/pwInput.component'

import '../styles/Login.scss'

const Login = ({setUser, history}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')

    const handleCreateUser = async e => {
        e.preventDefault()
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
                        history.push('/account-setup')
                    })
        } catch(exception) {
            setErrorMessage('Invalid username/password')

            setTimeout(() => {setErrorMessage(null)}, 10000) 
        }
    }

    return (
        <div className="Login">
            <h1 className="Login-title">Savr</h1>
            <form onSubmit={handleCreateUser} className="Login-form"> 
                <TextInput
                    className="Login-form-name Login-input" 
                    onChange={e => setName(e.target.value)}
                    value={name} 
                    placeholder='name' />
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

                 <PWInput 
                    className="Login-form-confirmpw Login-input" 
                    onChange={e => setConfirmPassword(e.target.value)}
                    value={confirmPassword} 
                    placeholder='confirm password'/>
                
                <p className="Login-error">{errorMessage}</p>

                <button className="Login-submit btn-lite">
                    Next
                </button>
            </form>
            <Link to='/login' className="Login-create">Have an account?</Link>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(setUser(user)),
    toggleLoading: () => dispatch(toggleLoading())
})

export default connect(null, mapDispatchToProps)(Login)