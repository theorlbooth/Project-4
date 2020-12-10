import React, { useState } from 'react'
import axios from 'axios'


const Register = (props) => {

  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const [errors, updateErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })



  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    const data = {
      ...formData,
      [name]: value
    }

    const newErrors = {
      ...errors,
      [name]: ''
    }
    updateFormData(data)
    updateErrors(newErrors)
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/register', formData)
      .then(resp => {
        console.log(resp)
        console.log(resp.data)
        if (resp.data.errors) {
          // console.log(resp.data.errors)
          updateErrors(resp.data.errors)
          console.log(errors)
        } else {
          props.history.push('/login')
        }
      })
  }


  return <>
    <div className="register">
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Username:</label>
          <div className="control">
            <input className="input" type="text" placeholder="Username" onChange={handleChange} value={formData.username} name="username" />
            {errors.username && <p style={{ color: 'red' }}>
              {errors.username}</p>}
          </div>
        </div>
        <div className="field">
          <label className="label">Email:</label>
          <div className="control">
            <input className="input" type="text" placeholder="E-mail" onChange={handleChange} value={formData.email} name="email" />
            {errors.email && <p style={{ color: 'red' }}>
              {errors.email}</p>}
          </div>
        </div>
        <div className="field">
          <label className="label">Password:</label>
          <div className="control">
            <input className="input" type="password" placeholder="Password" onChange={handleChange} value={formData.password} name="password" />
            {errors.password && <p style={{ color: 'red' }}>
              {errors}</p>}
          </div>
        </div>
        <div className="field">
          <label className="label">Password Confirmation:</label>
          <div className="control">
            <input className="input" type="password" placeholder="Confirm password" onChange={handleChange} value={formData.passwordConfirmation} name="passwordConfirmation" />
            {errors.passwordConfirmation && <p style={{ color: 'red' }}>
              Passwords do not match</p>}
          </div>
        </div>
        <div className="login-buttons">
          <div className="control buttonflex">
            <button style={{ border: '3px solid #F4ECD8' }} className="button is-black">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </>
}


export default Register