import React from "react";
import Application from "./Application";

const ApplicationsList = (props) => {
  const renderApplications = () => {
    console.log(props.applications);
    return props.applications.map((application) => (
      <Application key={application.id} application={application} />
    ));
  };

  return <div>{renderApplications()}</div>;
};

export default ApplicationsList;
