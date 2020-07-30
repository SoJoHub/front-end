import React from "react";
import Application from "./Application";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import { flexbox, flex } from '@material-ui/system';
import Box from '@material-ui/core/Box';

const ApplicationsList = (props) => {
  const renderApplications = () => {
    // console.log(props.applications);
    // debugger;
    return props.applications.slice(0, 6).map((application) => (
      // <div className="app-card">
        <Application key={application.id} application={application} />
      // </div>
    ));
  };

  return <Box className="app-list">{renderApplications()}</Box>;
};

export default ApplicationsList;
