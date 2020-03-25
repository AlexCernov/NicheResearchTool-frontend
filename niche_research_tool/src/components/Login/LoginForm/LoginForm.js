/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import validate from 'validate.js';
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles';
import { Button, TextField } from '@material-ui/core';
import useRouter from '../../../utils/useRouter'
import UserContext from '../../../Store/context/user.context';
const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' }
  }
};

const useStyles = makeStyles({
  root: {},
  fields: {
    margin: '-8px',
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexGrow: 1,
      margin: '8px'
    }
  },
  submitButton: {
    marginTop: '16px',
    width: '100%'
  }
});

const LoginForm = () => {

  const classes = useStyles();
  const router = useRouter();
  const value = useContext(UserContext)

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await value.loginEmail(formState.values.email, formState.values.password)
    router.history.push('/')
    
  };

  const handleLoginGoogle = async e => {
    e.preventDefault()
    await value.loginGoogle()
    router.history.push('/')
    }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <form
     
      className={clsx(classes.root)}
      onSubmit={handleSubmit}
    >
      <div className={classes.fields}>
        <TextField
          error={hasError('email')}
          fullWidth
          helperText={hasError('email') ? formState.errors.email[0] : null}
          label="Email address"
          name="email"
          onChange={handleChange}
          value={formState.values.email || ''}
          variant="outlined"
        />
        <TextField
          error={hasError('password')}
          fullWidth
          helperText={
            hasError('password') ? formState.errors.password[0] : null
          }
          label="Password"
          name="password"
          onChange={handleChange}
          type="password"
          value={formState.values.password || ''}
          variant="outlined"
        />
      </div>
      <Button
        className={classes.submitButton}
        color="secondary"
        disabled={!formState.isValid}
        size="large"
        type="submit"
        variant="contained"
      >
        Sign in
      </Button>
      <Button
       className={classes.submitButton}
       color="primary"
       onClick={handleLoginGoogle}
      >Sign in with google</Button>
    </form>
  );
};
export default LoginForm;
