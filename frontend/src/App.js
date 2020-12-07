import React from 'react'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
import '../styles/style.scss'
import bulma from 'bulma'

import NavBar from './components/Navbar'
import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register'
import Explore from './components/Explore'
import Country from './components/Country'


const App = () => {
  return <>
  <BrowserRouter>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/explore" component={Explore}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/register" component={Register}></Route>
      <Route exact path="/country/:countrycode" component={Country}></Route>
    </Switch>
  </BrowserRouter>
  </>
}


export default App