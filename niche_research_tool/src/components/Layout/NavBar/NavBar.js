import React, { Fragment, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Drawer, Divider, Paper, Avatar, Typography } from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import  Navigation  from '../Navigation/Navigation'
import navigationConfig from './navigationConfig';
import useRouter from '../../../utils/useRouter'
import UserContext from '../../../Store/context/user.context'


const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    overflowY: 'auto'
  },
  content: {
    padding: '16px'
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: '8px'
  },
  divider: {
    marginTop: '16px'
  },
  navigation: {
    marginTop: '16px'
  }
}));

const NavBar = props => {
  const { openMobile, onMobileClose, className, ...rest } = props;

  const classes = useStyles();
  const router = useRouter();
  const { dbUser } = useContext(UserContext)

  useEffect(() => {
    if (openMobile) {
      onMobileClose && onMobileClose();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.location.pathname]);

  const navbarContent = (
    <div className={classes.content}>
      {dbUser !== undefined && <div className={classes.profile}>
        <Avatar
          alt="Person"
          className={classes.avatar}
          component={RouterLink}
          src={dbUser.Photo}
          to="/profile/"
        />
        <Typography
          className={classes.name}
          variant="h6"
        >
          {dbUser.FirstName} {dbUser.LastName}
        </Typography>
        <Typography variant="body2">{dbUser.Role.Type}</Typography>
      </div>}
      <Divider className={classes.divider} />
      <nav className={classes.navigation}>
        {navigationConfig.map(list => (
          <Navigation
            component="div"
            key={list.title}
            pages={list.pages}
            title={list.title}
          />
        ))}
      </nav>
    </div>
  );

  return (
    <Fragment>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          <div
            {...rest}
            className={clsx(classes.root, className)}
          >
            {navbarContent}
          </div>
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Paper
          {...rest}
          className={clsx(classes.root, className)}
          elevation={1}
          square
        >
          {navbarContent}
        </Paper>
      </Hidden>
    </Fragment>
  );
};

NavBar.propTypes = {
  className: PropTypes.string,
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;
