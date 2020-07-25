import React from "react";
import AddApplication from "../Components/AddApplication";
import ApplicationsList from "../Components/ApplicationsList";

class ApplicationsContainer extends React.Component {
  state = {
    applications: [],
  };

  componentDidMount() {
    let user = window.localStorage.getItem("sojohub");
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

  render() {
    return (
      <div>
        <AddApplication />
        <ApplicationsList applications={this.state.applications} />
      </div>
    );
  }
}

export default ApplicationsContainer;
