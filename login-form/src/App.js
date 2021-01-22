

import React from 'react'
import Register from "./Register"
import Login from "./Login";
import Profile from "./Profile"
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom"; 



function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Register/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/profile">
            <Profile/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
