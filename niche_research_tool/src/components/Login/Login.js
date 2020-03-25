import React from 'react'
import { Link as RouterLink, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Link,
  Avatar
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock'
import Page from '../Common/Page'
import gradients from '../../utils/gradients'
import LoginForm from './LoginForm'
import UserContext from '../../Store/context/user.context'


const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 16px'
  },
  card: {
    width: 960,
    maxWidth: '100%',
    overflow: 'unset',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%'
    }
  },
  content: { 
    padding: '64px 32px 24px 32px'
  },
  media: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: '24px',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    [createMuiTheme().breakpoints.down('md')]: {
      display: 'none'
    }
  },
  icon: {
    backgroundImage: gradients.green,
    color: '#fff',
    borderRadius: 4,
    padding: '8px',
    position: 'absolute',
    top: -32,
    left: '24px',
    height: 64,
    width: 64,
    fontSize: 32
  },
  loginForm: {
    marginTop: '24px'
  },
  divider: {
    margin: '16px 0px'
  },
  person: {
    marginTop: '16px',
    display: 'flex'
  },
  avatar: {
    marginRight: '16px'
  }
}));

const Login = () => {
  const classes = useStyles();
 const {isAuthenticated} = React.useContext(UserContext)
 if(isAuthenticated)  return <Redirect to='/'/>
  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <LockIcon className={classes.icon} />
          <Typography
            gutterBottom
            variant="h3"
          >
            Sign in
          </Typography>
          <Typography variant="subtitle2">
            Sign in on the internal platform
          </Typography>
          <LoginForm className={classes.loginForm} />
          <Divider className={classes.divider} />
          <Link
            align="center"
            color="secondary"
            component={RouterLink}
            to="/register"
            underline="always"
            variant="subtitle2"
          >
            Don't have an account?
          </Link>
        </CardContent>
        <CardMedia
          className={classes.media}
          image="/images/auth.png"
          title="Cover"
        >
          <Typography
            color="inherit"
            variant="subtitle1"
          >
            Hella narvwhal Cosby sweater McSweeney's, salvia kitsch before they
            sold out High Life.
          </Typography>
          <div className={classes.person}>
            <Avatar
              alt="Person"
              className={classes.avatar}
              src="/images/avatars/avatar_2.png"
            />
            <div>
              <Typography
                color="inherit"
                variant="body1"
              >
                Ekaterina Tankova
              </Typography>
              <Typography
                color="inherit"
                variant="body2"
              >
                Manager at inVision
              </Typography>
            </div>
          </div>
        </CardMedia>
      </Card>
    </Page>
  );
};

export default Login;
