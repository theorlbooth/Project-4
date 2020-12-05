import React from 'react'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
import '../styles/style.scss'
import bulma from 'bulma'

import NavBar from './components/Navbar'


const App = () => {
  return <>
  <BrowserRouter>
    <NavBar />
    <Switch>

    </Switch>
  </BrowserRouter>
  </>
}


export default App