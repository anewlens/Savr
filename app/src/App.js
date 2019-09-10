import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'

import './styles/App.scss'

import { getAccount } from './redux/account/account.actions'
import { selectAccount } from './redux/account/account.selectors'

import accountServices from './services/account'
import userServices from './services/user'

import Login from './components/Login'
import AccountCreate from './components/AccountCreate'
import Header from './components/Header'
import Balance from './components/Balance'
import Transactions from './components/Transactions'
import Budget from './components/Budget'
import Account from './components/Account'
import './styles/MediaQueries.scss'

function App({getAccount}) {

  const [account, setAccount] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('transactions')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const LoggedInUserJSON = window.localStorage.getItem('LoggedInUser')

    if (LoggedInUserJSON) {
      const user = JSON.parse(LoggedInUserJSON)

      setUser(user)
      accountServices.setToken(user.token)
      userServices.setToken(user.token)

      accountServices
        .getAccount(user)
        .then(res => {
          console.log('user', user)
            getAccount(res)
            setAccount(res)
            setLoading(false)
            setLoggedIn(true)
        })
    }
  }, [])

  const addItem = newTransaction => {
    accountServices
      .addTransaction(newTransaction)
      .then(async res => {
        await setAccount({
            ...account,
            currentBalance: account.currentBalance - newTransaction.amount,
            ...account.transactions.push(res)
        })

      })
  }

  if (!account && !user) {
    return <Login
              setUser={setUser}
              setAccount={setAccount}
              setLoading={setLoading}/>
  } else if (!account && user) {
    return <AccountCreate 
              user={user} 
              setAccount={setAccount} 
              setLoading={setLoading}/>
  }  else if (account && user) {
    return (
      <div className="App">
          <Header 
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            view={view}
            setView={setView}
            setUser={setUser}
            setLoading={setLoading}
            />
          <main className="main">
            <Balance 
              loading={loading}
              addTransaction={addItem}/>
    
            <Transactions
                  loading={loading}
                  show={view === 'transactions' ? true : false} />
    
            {!loading && <Budget
                  show={view === 'budget' ? true : false} />}
    
            {!loading && <Account 
                  show={view === 'account' ? true : false}/>}
          </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  account: selectAccount(state)
})

const mapDispatchToProps = dispatch => ({
  getAccount: account => dispatch(getAccount(account)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
