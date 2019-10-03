import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from '../components/Header'
import Balance from '../components/Balance'
import Transactions from '../components/Transactions'
import Budget from '../components/Budget'
import Account from '../components/Account'

const Home = () => (
        <div className="Home">
            <Header />
            <main className="main">
                <Balance />

                    <Switch>
                        <Route path='/home/transactions' component={Transactions} />
                        <Route path='/home/budget' component={Budget} />
                        <Route path='/home/account' component={Account} />
                    </Switch>
            </main>

        </div>
    )

export default Home