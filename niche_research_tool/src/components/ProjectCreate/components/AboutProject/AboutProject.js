import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Chip,
  Typography
} from '@material-ui/core';
import DatePicker from '@material-ui/pickers/DatePicker/index';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import Alert from '../../../Common/Alert';
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme()
const useStyles = makeStyles({
  root: {},
  alert: {
    marginBottom: theme.spacing(3)
  },
  formGroup: {
    marginBottom: theme.spacing(3)
  },
  fieldGroup: {
    display: 'flex',
    alignItems: 'center'
  },
  fieldHint: {
    margin: theme.spacing(1, 0)
  },
  tags: {
    marginTop: theme.spacing(1),
    '& > * + *': {
      marginLeft: theme.spacing(1)
    }
  },
  flexGrow: {
    flexGrow: 1
  },
  dateField: {
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  }
});

const AboutProject = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const initialValues = {
    name: '',
    tag: '',
    tags: ['leather bracelet', 'leather bracelet for men'],
    startDate: moment(),
    endDate: moment().add(1, 'day')
  };

  const [values, setValues] = useState({ ...initialValues });

  const handleFieldChange = (event, field, value) => {
    event.persist && event.persist();
    setValues(values => ({
      ...values,
      [field]: value
    }));
  };

  const handleTagAdd = () => {
    setValues(values => {
      const newValues = { ...values };

      if (newValues.tag && !newValues.tags.includes(newValues.tag)) {
        newValues.tags = [...newValues.tags];
        newValues.tags.push(newValues.tag);
      }

      newValues.tag = '';

      return newValues;
    });
  };

  const handleTagDelete = tag => {
    setValues(values => {
      const newValues = { ...values };

      newValues.tags = newValues.tags.filter(t => t !== tag);

      return newValues;
    });
  };


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Project information" />
      <CardContent>
        <form>
          <Alert
            className={classes.alert}
            message="Once you choose the project name and niches you can’t change it."
          />
          <Alert
            className={classes.alert}
            message="Try to add related niches to the same project (see examples)"
          />
          <Alert
            className={classes.alert}
            message="You will only be able to add items from the niches you add now !"
          />
          <div className={classes.formGroup}>
            <TextField
              fullWidth
              label="Project Name"
              name="name"
              onChange={event =>
                handleFieldChange(event, 'name', event.target.value)
              }
              value={values.name}
              variant="outlined"
            />
          </div>
          <div className={classes.formGroup}>
            <div className={classes.fieldGroup}>
              <TextField
                className={classes.flexGrow}
                label="Project Niches"
                name="tag"
                onChange={event =>
                  handleFieldChange(event, 'tag', event.target.value)
                }
                value={values.tag}
                variant="outlined"
              />
              <Button
                className={classes.addButton}
                onClick={handleTagAdd}
                size="small"
              >
                <AddIcon className={classes.addIcon} />
                Add
              </Button>
            </div>
            <Typography
              className={classes.fieldHint}
              variant="body2"
            >
              Example: batteries, car batteries, phone batteries
            </Typography>
            <div className={classes.tags}>
              {values.tags.map(tag => (
                <Chip
                  deleteIcon={<CloseIcon />}
                  key={tag}
                  label={tag}
                  onDelete={() => handleTagDelete(tag)}
                />
              ))}
            </div>
          </div>
        </form>
      </CardContent>
      
    </Card>
  );
};

AboutProject.propTypes = {
  className: PropTypes.string
};

export default AboutProject;
