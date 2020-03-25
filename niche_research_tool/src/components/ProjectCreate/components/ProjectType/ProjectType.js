import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Radio,
  colors
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme()
const useStyles = makeStyles({
  root: {},
  option: {
    border: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    alignItems: 'flex-start',
    padding: theme.spacing(2),
    maxWidth: 560,
    '& + &': {
      marginTop: theme.spacing(2)
    }
  },
  selectedOption: {
    backgroundColor: colors.grey[50]
  },
  optionRadio: {
    margin: -10
  },
  optionDetails: {
    marginLeft: theme.spacing(2)
  }
});

const AboutAuthor = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [selected, setSelected] = useState('amazon');

  const handleChange = (event, option) => {
    setSelected(option.value);
  };

  const options = [
    {
      value: 'amazon',
      title: 'Amazon project',
      description: 'Meant to save amazon items under the same niche in one place for further investigation'
    },
    {
      value: 'alibaba',
      title: 'Alibaba project',
      description:
        'Alibaba items that you took interest in and want to check up on later'
    },
  ];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Choose project type" />
      <CardContent>
        {options.map(option => (
          <div
            className={clsx(classes.option, {
              [classes.selectedOption]: selected === option.value
            })}
            key={option.value}
          >
            <Radio
              checked={selected === option.value}
              className={classes.optionRadio}
              color="primary"
              onClick={event => handleChange(event, option)}
            />
            <div className={classes.optionDetails}>
              <Typography
                gutterBottom
                variant="h5"
              >
                {option.title}
              </Typography>
              <Typography variant="body1">{option.description}</Typography>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

AboutAuthor.propTypes = {
  className: PropTypes.string
};

export default AboutAuthor;
