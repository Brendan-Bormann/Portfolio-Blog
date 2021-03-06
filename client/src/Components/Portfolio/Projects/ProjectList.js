import React, { Component } from 'react';
import API from '../../../utils/API';

import './ProjectList.css';

import ProjectLI from './ProjectLI/ProjectLI';

class ProjectList extends Component {

  state = {
    projects: [
      {
        title: "",
        link: "",
        summary: "",
        imageUrl: ""
      }
    ]
  }

  componentDidMount() {
    // Post a Project
    // this.postProject();
    this.loadProjects();
  }

  loadProjects = () => {
    API.getAllProjects()
      .then(res => {
        this.setState({ projects: res.data});
      })
      .catch(err => {
        console.log(err);
        alert("There was an error getting projects. Sorry!");
      });
  };

  displayProjects = () => {
    return this.state.projects.map(data => {
      var i = 0;
      var key = data._id || ++i;
      return <ProjectLI project={data} key={key} />
    });
  }

  postProject = () => {
    API.saveProject({
      title:    "Hacker News",
      link:     "https://brendan-bormann.github.io/TriviaGame/",
      summary:  "A forum to promote news articles in the tech community.",
      imageUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple128/v4/61/e7/6d/61e76d36-7b44-7173-2540-412605060935/AppIcon-1x_U007emarketing-85-220-0-6.png/246x0w.jpg"
    })
      .then(res => {
        alert("Success!");
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="ProjectList">
        <h2 className="PageTitle animated fadeInRight">Showcase</h2>
        <hr />
        <div className="ProjectList-Container">
          {this.displayProjects()}
        </div>
      </div>
    );
  }
}

export default ProjectList;