import React from "react";
import AddApplication from "../Components/AddApplication";
import ApplicationsList from "../Components/ApplicationsList";

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

  render() {
    console.log(this.state);
    return (
      <div>
        <h1> My Applications </h1>
        <AddApplication addApplication={this.addApplication} />
        <ApplicationsList applications={this.state.applications} />
      </div>
    );
  }
}

export default ApplicationsContainer;
