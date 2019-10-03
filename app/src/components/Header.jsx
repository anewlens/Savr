import React from 'react'
import { NavLink } from 'react-router-dom'

import '../styles/Header.scss'

import Profile from './profile'

const Header = () => (
    <header className="Header">
        <h1 className="Header-title">Savr</h1>
        <nav className="Header-nav">
            <NavLink to='/home/transactions' className='Header-nav-links btn-lite' activeClassName='Header-nav-selected'>Transactions</NavLink>
            <NavLink to='/home/budget' className='Header-nav-links btn-lite' activeClassName='Header-nav-selected'>Budget</NavLink>
            <NavLink to='/home/account' className='Header-nav-links btn-lite' activeClassName='Header-nav-selected'>Account</NavLink>
        </nav>

        <Profile />
        
    </header>
)

export default Header