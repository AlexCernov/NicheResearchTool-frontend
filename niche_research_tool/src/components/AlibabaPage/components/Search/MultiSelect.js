import React, { Fragment, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Checkbox,
  Menu,
  MenuItem,
  
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles({
  root: {},
  menuItem: {
    padding: 0
  },
  formControlLabel: {
    padding: '4px 16px',
    width: '100%',
    margin: 0
  }
});

const MultiSelect = props => {
  const { label, options, onChange, id, classId } = props;
  const classes = useStyles();

  const anchorRef = useRef(null);

  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  const handleOptionToggle = event => {
    let checked;
    options.forEach(option => {
      if(option.name === event.target.value)
       checked = option
    })
   onChange && onChange({item : checked, category: id , id : classId});
  };
  if(options !== null)
  return (
    <Fragment>
      <Button
        onClick={handleMenuOpen}
        ref={anchorRef}
      >
        {label}
        <ArrowDropDownIcon />
      </Button>
      <Menu
        variant='menu'
        anchorEl={anchorRef.current}
        className={classes.menu}
        onClose={handleMenuClose}
        open={openMenu}
        // eslint-disable-next-line react/jsx-sort-props
        PaperProps={{ style: { width: 250 } }}
      >
        {options.map(option => (
          
          <MenuItem
            className={classes.menuItem}
            key={option.id}
            onChange={handleOptionToggle}


          >
             <Checkbox
                  checked={option.checked}
                  color="primary"
                  value={option.name}
                  inputProps={{ 'aria-label': option.name }}


                /> {option.name}

          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
  else return null
};

MultiSelect.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
};

export default MultiSelect;
