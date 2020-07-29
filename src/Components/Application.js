import React from "react";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

const Application = (props) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/applications/${props.application.id}`);
  };

  console.log(props.application);
  return (
    <div style={{ padding: 14 }} className="App">
      {/* <h1>My Applications</h1> */}
      <Paper style={{ padding: "0px 20px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>{/* <Avatar alt="Remy Sharp" src={imgLink} /> */}</Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>
              Application {props.application.id}
            </h4>
            <p style={{ textAlign: "left" }}>
              Job Title: {props.application.job_listing.title}
            </p>
            <p style={{ textAlign: "left" }}>
              Company: {props.application.job_listing.company}
            </p>
            <p style={{ textAlign: "left" }}>
              Date Applied: {props.application.date_applied}
            </p>
            <p style={{ textAlign: "left" }}>
              Status: {props.application.status}
            </p>
            <Button onClick={handleClick} variant="contained" color="primary">
                View Details
            </Button>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      </Paper>
    </div>
  );
};

export default Application;
