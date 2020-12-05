import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const Navbar = (props) => {

  const token = localStorage.getItem('token')

  function handleLogout() {
    localStorage.removeItem('token')
    props.history.push('/')
    location.reload()
  }

  return <>
    <nav className="navbar">
      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link className="button is-black" to="/">Home</Link>
              <Link className="button is-black" to="/search">Search</Link>
              {token && <Link className="button is-black" to="/user">User</Link>}
              {!token && <Link className="button is-black" to="/login">Login</Link>}
              {token && <Link className="button is-black" to="/" onClick={handleLogout}>Logout</Link>}
            </div>
          </div>
        </div>
      </div>
    </nav>
  
  
  
  </>
}

export default withRouter(Navbar)