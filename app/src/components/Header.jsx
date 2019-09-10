import React from 'react'
import {connect} from 'react-redux'

import { selectName } from '../redux/account/account.selectors'

import '../styles/Header.scss'

import Profile from './profile'

const Header = ({setLoggedIn, view, setView, setUser, setLoading}) => {

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
                setLoggedIn={setLoggedIn}
                setUser={setUser}
                setLoading={setLoading}
                />
            
        </header>
    )
}

const mapStateToProps = state => ({
    name: selectName(state)
})

export default connect(mapStateToProps)(Header)