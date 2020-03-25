import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper, Button, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme()
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  search: {
    flexGrow: 1,
    height: 42,
    padding: '0px 16px',
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    marginRight: '16px',
    color: theme.palette.icon
  },
  searchInput: {
    flexGrow: 1
  },
  searchButton: {
    marginLeft: '16px'
  }
});

const Search = props => {
  const { onSearch, className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Paper
        className={classes.search}
        elevation={1}
      >
        <SearchIcon className={classes.searchIcon} />
        <Input
          className={classes.searchInput}
          disableUnderline
          placeholder="Search"
        />
      </Paper>
      <Button
        className={classes.searchButton}
        onClick={onSearch}
        size="large"
        variant="contained"
      >
        Search
      </Button>
    </div>
  );
};

Search.propTypes = {
  className: PropTypes.string,
  onSearch: PropTypes.func
};

export default Search;
