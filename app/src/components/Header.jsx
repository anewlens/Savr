import React, { useContext } from 'react'
import AccountContext from '../Context/Account'
import '../styles/Header.scss'

import Profile from './profile'

const Header = ({setLoggedIn, view, setView, setUser, setLoading}) => {

    const {account, setAccount} = useContext(AccountContext)

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

            <Profile 
                name={account.name}
                setLoggedIn={setLoggedIn}
                setAccount={setAccount}
                setUser={setUser}
                setLoading={setLoading}
                />
            
        </header>
    )
}

export default Header