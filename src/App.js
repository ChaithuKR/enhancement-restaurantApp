import React, {useState, createContext, Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Cookies from 'js-cookie'
import Login from './components/Login'

import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'

import {CartProvider} from './Context/CartContext'

const isAuthenticated = Cookies.get('jwt_token') !== undefined

class App extends Component {
  render() {
    return (
      <CartProvider>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute
              exact
              path="/"
              component={Home}
              isAuthenticated={isAuthenticated}
            />
            <ProtectedRoute
              exact
              path="/cart"
              component={Cart}
              isAuthenticated={isAuthenticated}
            />
          </Switch>
        </Router>
      </CartProvider>
    )
  }
}

export default App
