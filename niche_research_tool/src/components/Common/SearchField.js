import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { Input, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    root: {},
    keywords: {
      padding: '16px',
      display: 'flex',
      alignItems: 'center'
    },
    searchIcon: {
      color: 'black',
      marginRight: '16px'
    }
  });
  

const SearchField = props => {
  const classes = useStyles();

    const { handleInput, handleClickButton ,text } = props
    return (
        <div className={classes.keywords}>
        <SearchIcon className={classes.searchIcon} />
        <Input
          disableUnderline
          onChange={handleInput}
          placeholder={text}
        />
        <Button onClick={handleClickButton} variant="contained" color="primary" >Search</Button>
      </div>
    )
}

export default SearchField
