import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import Page from '../Common/Page';
import { createMuiTheme } from '@material-ui/core/styles'

import {
  Header,
  ProjectType,
  AboutProject,
  Preferences,
  ProjectDetails
} from './components';
const theme = createMuiTheme()

const useStyles = makeStyles({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3, 3, 6, 3)
  },
  ProjectType: {
    marginTop: theme.spacing(3)
  },
  aboutProject: {
    marginTop: theme.spacing(3)
  },
  projectCover: {
    marginTop: theme.spacing(3)
  },
  projectDetails: {
    marginTop: theme.spacing(3)
  },
  preferences: {
    marginTop: theme.spacing(3)
  },
  actions: {
    marginTop: theme.spacing(3)
  }
});

const ProjectCreate = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Project Create"
    >
      <Header />
      <ProjectType className={classes.ProjectType} />
      <AboutProject className={classes.aboutProject} />
      <ProjectDetails className={classes.projectDetails} />
      <Preferences className={classes.preferences} />
      <div className={classes.actions}>
        <Button
          color="primary"
          variant="contained"
        >
          Create project
        </Button>
      </div>
    </Page>
  );
};

export default ProjectCreate;
