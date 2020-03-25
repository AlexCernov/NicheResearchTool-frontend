import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

import  Page from '../../Common/Page';
import SearchBar from '../../Common/SearchBar';
import Paginate from '../../Common/Paginate';
import  Header from './components/Header';
import  ProjectCard from './components/ProjectCard';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '24px'
  },
  results: {
    marginTop: '24px'
  },
  paginate: {
    marginTop: '24px',
    display: 'flex',
    justifyContent: 'center'
  }
}));

const ProjectManagementList = () => {
  const classes = useStyles();
  const [rowsPerPage] = useState(10);
  const [page] = useState(0);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchProjects = () => {
    //   axios.get('/api/projects').then(response => {
    //     if (mounted) {
    //       setProjects(response.data.projects);
    //     }
    //   });
    };

    fetchProjects();

    return () => {
      mounted = false;
    };
  }, []);

  const handleFilter = () => {};
  const handleSearch = () => {};

  return (
    <Page
      className={classes.root}
      title="Project Management List"
    >
      <Header />
      <SearchBar
        onFilter={handleFilter}
        onSearch={handleSearch}
      />
      <div className={classes.results}>
        <Typography
          color="textSecondary"
          gutterBottom
          variant="body2"
        >
          {projects.length} Records found. Page {page + 1} of{' '}
          {Math.ceil(projects.length / rowsPerPage)}
        </Typography>
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
      <div className={classes.paginate}>
        <Paginate pageCount={3} />
      </div>
    </Page>
  );
};

export default ProjectManagementList;
