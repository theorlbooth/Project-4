import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import { getUserId } from '../lib/auth'

const Navbar = (props) => {

  const token = localStorage.getItem('token')

  function handleLogout() {
    localStorage.removeItem('token')
    props.history.push('/')
    location.reload()
  }

  return <>
    <nav className="navbar" style={{ backgroundColor: '#F4ECD8' }}>
      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons" style={{ opacity: '90%' }}>
              {/* <Link className="button is-black" to="/">Home</Link> */}
              {/* <Link className="button is-black" to="/search">Search</Link> */}
              <Link className="button is-black" style={{ color: '#F4ECD8' }} to="/explore">Explore</Link>
              <Link className="button is-black" style={{ color: '#F4ECD8' }} to="/folders">Folders</Link>
              {token && <Link style={{ color: '#F4ECD8' }} className="button is-black" to="/trip_planner">Trip Planner</Link>}
              {token && <Link style={{ color: '#F4ECD8' }} className="button is-black" to={`/user/${getUserId()}`}>User</Link>}
              {!token && <Link style={{ color: '#F4ECD8' }} className="button is-black" to="/login">Login</Link>}
              {token && <Link style={{ color: '#F4ECD8' }} className="button is-black" to="/" onClick={handleLogout}>Logout</Link>}
            </div>
          </div>
        </div>
      </div>
    </nav>
  
  
  
  </>
}

export default withRouter(Navbar)