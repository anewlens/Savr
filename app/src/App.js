import React, {useEffect} from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import './styles/App.scss'

import { setAccount } from './redux/account/account.actions'
import { selectAccount } from './redux/account/account.selectors'
import { setUser } from './redux/user/user.actions'
import { selectUser } from './redux/user/user.selectors'
import { selectLoading } from './redux/loading/loading.selectors'
import { toggleLoading } from './redux/loading/loading.actions'

import accountServices from './services/account'
import userServices from './services/user'

import Loading from './components/Loading.component'
import Login from './components/Login'
import AccountCreate from './components/AccountCreate'
import Home from './pages/Home.component'

import './styles/MediaQueries.scss'

function App({account, loading, toggleLoading, setAccount, setUser}) {

  useEffect(() => {
    //Check Local Storage for user
    const LoggedInUserJSON = window.localStorage.getItem('LoggedInUser')

    if (LoggedInUserJSON) {
      const user = JSON.parse(LoggedInUserJSON)

      setUser(user)
      accountServices.setToken(user.token)
      userServices.setToken(user.token)

      accountServices
        .getAccount(user)
        .then(res => {
            setAccount(res)
            toggleLoading(false)
            console.log('Got local storage')
        })
    } else {
      toggleLoading(false)
    }
  }, [])

  if (loading === true) return <Loading />

  return (
    <div className="App">
        <Router>
          <Switch>
            <Route 
              exact path='/' 
              component={() => 
                !account 
                ? <Redirect to='/login' />
                : <Redirect to='/home/transactions' />} />

            <Route 
              path='/login' 
              exact
              component={Login}/>

            <Route
              path='/home'
              component={Home} />
              
            <Route path='/account-create' component={AccountCreate} />
          </Switch>
        </Router>
    </div>
  )
}

const mapStateToProps = state => ({
  account: selectAccount(state),
  user: selectUser(state),
  loading: selectLoading(state),
})

const mapDispatchToProps = dispatch => ({
  setAccount: account => dispatch(setAccount(account)),
  setUser: user => dispatch(setUser(user)),
  toggleLoading: () => dispatch(toggleLoading()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
