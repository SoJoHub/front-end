import React from "react";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';

const Application = (props) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/applications/${props.application.id}`);
  };

  // console.log(props.application);
  return (
    <div>
      {/* <h1>My Applications</h1> */}
      {/* <Paper style={{ padding: "0px 20px" }}> */}
        {/* <Grid container wrap="nowrap" spacing={2} direction="row"> */}
          {/* <Grid item><Avatar alt="Remy Sharp" src={imgLink} /></Grid> */}
          <Box className="app-card">
            <h3 style={{ margin: 0, textAlign: "left" }}>
              <u>Application {props.application.id}</u>
            </h3>
            <br></br>
            <p style={{ textAlign: "left" }}>
              <b>Job Title:</b> {props.application.job_listing.title}
            </p>
            <p style={{ textAlign: "left" }}>
              <b>Company:</b> {props.application.job_listing.company}
            </p>
            <p style={{ textAlign: "left" }}>
              <b>Date Applied:</b> {props.application.date_applied}
            </p>
            <p style={{ textAlign: "left" }}>
              <b>Status:</b> {props.application.status}
            </p>
            <br></br>
            <Button onClick={handleClick} variant="contained" className="view-details-button">
                View Details
            </Button>
          </Box>
        {/* </Grid> */}
        {/* <Divider variant="fullWidth" style={{ margin: "30px 0" }} /> */}
      {/* </Paper> */}
    </div>
  );
};

export default Application;
