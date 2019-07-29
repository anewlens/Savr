import React from 'react'
import '../styles/Header.scss'

import Login from './Login'
import Profile from './profile'


const Header = ({name, loggedIn, setLoggedIn, view, setView}) => {

    const viewHandler = e => {
        setView(e.target.value)
    }

    return (
        <header className="Header">
            <h1 className="Header-title">Savr</h1>
            <nav className="Header-nav">
                <button
                    onClick={viewHandler}
                    style={{
                        color: view === 'transactions' ? 'var(--magenta)' : 'white'
                    }}
                    value='transactions'
                    className="Header-nav-links btn-lite">Transactions</button>
                
                <button
                    onClick={viewHandler}
                    style={{
                        color: view === 'budget' ? 'var(--magenta)' : 'white'
                    }}
                    value='budget'
                    className="Header-nav-links btn-lite">Budget</button>
                
                <button
                    onClick={viewHandler}
                    style={{
                        color: view === 'account' ? 'var(--magenta)' : 'white'
                    }}
                    value='account'
                    className="Header-nav-links btn-lite">Account</button>
            </nav>

            {loggedIn
                ? <Profile name={name}/>
                : <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}
            
        </header>
    )
}

export default Header