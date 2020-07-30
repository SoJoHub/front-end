import React from "react";
import AddApplication from "../Components/AddApplication";
import ApplicationsList from "../Components/ApplicationsList";
import { flexbox, flex } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';


class ApplicationsContainer extends React.Component {
  state = {
    applications: [],
  };
  componentDidMount() {
    let user = window.localStorage.getItem("sojohub");
    if (user) {
      const token = JSON.parse(user).userToken;
      fetch("http://localhost:3000/applications", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      })
        .then((resp) => resp.json())
        .then((applications) => {
          this.setState({
            applications: applications,
          });
        });
    }
  }

  addApplication = (application) => {
    this.setState({
      applications: [...this.state.applications, application],
    });
  };

  deleteApplication = (application) => {};

  render() {
    console.log(this.state);
    return (
      <div>
        <Container maxWidth="lg">
          <h1 className={"app-cont-title"}> My Applications </h1>
          <AddApplication application={{}} addApplication={this.addApplication} />
          <Box>
            <ApplicationsList
              applications={this.state.applications}
              deleteApplication={this.deleteApplication}
            />
          </Box>
        </Container>
      </div>
    );
  }
}

export default ApplicationsContainer;
