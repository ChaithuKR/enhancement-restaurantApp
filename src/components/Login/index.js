import './index.css'

import Cookies from 'js-cookie'

import React, {useState, useEffect} from 'react'

import {useHistory} from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [errorMsg, setErrorMsg] = useState()
  const [error, setError] = useState(false)

  const history = useHistory()

  const onUsername = e => {
    setUsername(e.target.value)
  }

  const onPassword = e => {
    setPassword(e.target.value)
  }

  const onSubmitSuccess = jwt => {
    Cookies.set('jwt_token', jwt, {
      expires: 30,
    })
    history.push('/')
  }
  const onSubmitFailure = err => {
    setError(true)
    setErrorMsg(err)
  }

  const onCheckLoginDetails = async e => {
    e.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  return (
    <div className="login-container">
      <form className="form-container" onSubmit={onCheckLoginDetails}>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>{' '}
        <br />
        <input
          type="text"
          id="username"
          className="password-input-field"
          value={username}
          onChange={onUsername}
          placeholder="Username"
        />{' '}
        <br />
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>{' '}
        <br />
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={onPassword}
          placeholder="Password"
        />{' '}
        <br />
        <button type="submit" className="login-button">
          Login
        </button>
        {error && <p>{errorMsg}</p>}
      </form>
    </div>
  )
}

export default Login
