import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Login = (props) => {

  const [formData, updateFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, updateErrors] = useState('')

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    const data = {
      ...formData,
      [name]: value
    }

    updateErrors('')
    updateFormData(data)
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/login', formData)
      .then(resp => {
        if (resp.data.message === 'Unauthorized Login Attempt') {
          updateErrors(resp.data.message)
        } else {
          localStorage.setItem('token', resp.data.token)
          props.history.push('/')
        }
      })
  }

  return <>
    <div className="register">
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Email:</label>
          <div className="control">
            <input className="input" type="text" placeholder="Email" onChange={handleChange} value={formData.email} name="email" />
          </div>
        </div>
        <div className="field">
          <label className="label">Password:</label>
          <div className="control">
            <input className="input" type="password" placeholder="Password" onChange={handleChange} value={formData.password} name="password" />
            {errors && <p style={{ color: 'red' }}>{errors}</p>}
          </div>
        </div>
        <div className="login-buttons">
          <div className="control button-flex">
            <button style={{ border: '3px solid #F4ECD8' }} className="button is-black">Login</button>
          </div>
          <div className="control button-flex">
            <Link style={{ border: '3px solid #F4ECD8' }} className="button is-danger" to={'/register'}>Register</Link>
          </div>
        </div>
      </form>
    </div>
  </>

}

export default Login