import React from 'react'
import {connect} from 'react-redux'

import { selectName } from '../redux/account/account.selectors'
import { setUser } from '../redux/user/user.actions'

import '../styles/Header.scss'

import Profile from './profile'

const Header = ({ view, setView}) => {

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

            <Profile />
            
        </header>
    )
}

const mapStateToProps = state => ({
    name: selectName(state)
})

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(setUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)