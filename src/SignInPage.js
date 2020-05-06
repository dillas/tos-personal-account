import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import FormHelperText from '@material-ui/core/FormHelperText'
import { useHistory, useLocation } from "react-router-dom"
import Api from './api'

const initialState = {username: '', password: ''}

function reducer(state, { field, value }) {
  return { ...state, [field]: value }
}

export default function SignIn(props) {
  const classes = useStyles()

  let history = useHistory()
  let location = useLocation()

  let { from } = location.state || { from: { pathname: "/" } };

  const [state, dispatch] = React.useReducer(reducer, initialState)
  const [error, setError] = React.useState(null)
  const onChange = e => dispatch({ field: e.target.name, value: e.target.value })
  const { username, password } = state

  let login = e => {
    e.preventDefault()
    Api.getUser({ username, password }).then(res => {
      if (res.data.length > 0) {
        props.setIsAuth(true)
        history.replace(from)
      } else {
        setError('Пользователь не найден')
      }
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin="normal"
            required
            fullWidth
            id="username"
            label="Логин"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={onChange}
          />
          <TextField
            variant='outlined'
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={onChange}
          />
          {error && <FormHelperText
            variant='outlined'
            error={true}
          >
            {error}
          </FormHelperText>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => login(e)}
          >
            Войти
          </Button>
          <FormHelperText>Секретные данные:<br />логин - "user"<br />пароль - "pass"</FormHelperText>
        </form>
      </div>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))