import React, {useState, useEffect} from 'react';
import './styles/App.scss'

import currencyFormatter from './utils/CurrencyFormatter'
import accountServices from './services/account'

import Header from './components/Header'
import Balance from './components/Balance'
import Transactions from './components/Transactions'
import Budget from './components/Budget'
import Account from './components/Account'

function App() {

  const [account, setAccount] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('transactions')

  useEffect(() => {
    accountServices
      .getAccount()
      .then(res => {
        console.log('return', res.data)
        setAccount(res.data[0])
        setLoggedIn(!loggedIn)
        setLoading(false)
      })
  }, [])

  const addItem = newTransaction => {
    accountServices
      .addTransaction(newTransaction)
      .then(res => {
        setAccount({
            ...account,
            ...account.transactions.push(res.data)
        })
      })
  }
  
  return (
    <div className="App">
      <Header 
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        view={view}
        setView={setView}
        name={account.name}/>
      <main className="main">
        <Balance 
          loading={loading}
          balance={currencyFormatter.format(account.currentBalance)}
          budget={account.monthlyBudget}
          spending={account.transactions}
          addTransaction={addItem}/>

        {view === 'account' && <Account />}

        <Transactions
              transactions={account.transactions}
              loading={loading}
              show={view === 'transactions' ? true : false} />

        {!loading && <Budget
              account={account}
              show={view === 'budget' ? true : false} />}

      </main>
    </div>
  );
}

export default App;
