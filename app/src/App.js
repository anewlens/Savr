import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'

import './styles/App.scss'

import { setAccount } from './redux/account/account.actions'
import { selectAccount } from './redux/account/account.selectors'
import { setUser } from './redux/user/user.actions'
import { selectUser } from './redux/user/user.selectors'
import { selectLoggedIn } from './redux/loggedIn/loggedIn.selectors'
import { toggleLoggedIn } from './redux/loggedIn/loggedIn.actions'
import { selectLoading } from './redux/loading/loading.selectors'
import { toggleLoading } from './redux/loading/loading.actions'

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

function App({account, loading, toggleLoading, setAccount, user, setUser}) {

  const [view, setView] = useState('transactions')

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
            setAccount(res)
            toggleLoading(false)
            toggleLoggedIn()
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
    return <Login />
  } else if (!account && user) {
    return <AccountCreate />
  }  else if (account && user) {
    return (
      <div className="App">
          <Header 
            view={view}
            setView={setView}
            />
          <main className="main">
            <Balance 
              addTransaction={addItem}/>
    
            <Transactions
                  show={view === 'transactions' ? true : false} />
    
            {!loading && <Budget
                  show={view === 'budget' ? true : false} />}
    
            {!loading && <Account 
                  show={view === 'account' ? true : false}/>}
          </main>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  account: selectAccount(state),
  user: selectUser(state),
  loggedIn: selectLoggedIn(state),
  loading: selectLoading(state)
})

const mapDispatchToProps = dispatch => ({
  setAccount: account => dispatch(setAccount(account)),
  setUser: user => dispatch(setUser(user)),
  toggleLoggedIn: () => dispatch(toggleLoggedIn()),
  toggleLoading: () => dispatch(toggleLoading())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
