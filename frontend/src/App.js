import React from 'react'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
import '../styles/style.scss'
import bulma from 'bulma'

import NavBar from './components/Navbar'
import Login from './components/Login'

const App = () => {
  return <>
  <BrowserRouter>
    <NavBar />
    <Switch>
      <Route exact path="/login" component={Login}></Route>
    </Switch>
  </BrowserRouter>
  </>
}


export default App