import React from 'react'

const Login = ({loggedIn, setLoggedIn}) => {

    const handleLogin = () => {
        setLoggedIn(!loggedIn)
    }

    return (
        <div className="Header-profile">
            <button 
                className="login"
                onClick={handleLogin}>Log in</button>
            <button className="register">Register</button>
        </div>
    )
}

export default Login