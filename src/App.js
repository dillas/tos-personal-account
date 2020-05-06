import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import SignIn from './SignInPage'
import AccoginPage from './AccountPage'
import PrivateRoute from './PrivateRoute'

function App() {
  const [isAuth, setIsAuth] = React.useState(false)

  return (
    <Router>
      <CssBaseline />
      <Switch>
        <PrivateRoute isAuth={isAuth} setIsAuth={setIsAuth} exact path="/">
          <AccoginPage setIsAuth={setIsAuth} />
        </PrivateRoute>
        <Route path="/login">
          <SignIn isAuth={isAuth} setIsAuth={setIsAuth} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
