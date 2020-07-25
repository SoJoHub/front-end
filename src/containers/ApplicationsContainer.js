import React from "react";
import AddApplication from "../components/AddApplication";
import ApplicationsList from "../components/ApplicationsList";

class ApplicationsContainer extends React.Component {
  state = {
    applications: [],
  };

  componentDidMount() {
    fetch("http://localhost:3000/applications")
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
