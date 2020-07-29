import React from "react";
import Interviews from "./Interviews";
import ApplicationsList from "../ApplicationsList";
import { useState, useEffect } from "react";
import Stats from "./Stats";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
const Home = () => {
  const classes = useStyles();

  const [applications, setApplications] = useState([]);
  //credentials
  let user = window.localStorage.getItem("sojohub");
  const token = JSON.parse(user).userToken;
  const username = JSON.parse(user).name;
  useEffect(() => {
    const payLoad = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    fetch("http://localhost:3000/applications", payLoad)
      .then((r) => r.json())
      .then((applicationsObj) => {
        setApplications(applicationsObj);
      });
  }, []);
  console.log(applications);
  const getInterviews = () => {
    return applications.filter((interview) => {
      if (interview.interviews.length > 0) {
        return interview.interviews;
      } else {
        return false;
      }
    });
  };
  // debugger;

  // const getApplications = () => {
  //   return applications.map((job) => {
  //     return job.job_listing;
  //   });
  // };

  const getStats = () => {
    const jobsApplied = applications.length;
    const interviews = applications.reduce((a, b) => {
      console.log(b.interviews.length > 0);
      if (b.interviews.length > 0) {
        return (a = a + 1);
      } else {
        return a;
      }
    }, 0);

    const offers = applications.reduce((a, b) => {
      if (b.status === "recieved offer") {
        return (a += 1);
      } else {
        return a;
      }
    }, 0);

    const rejections = applications.reduce((a, b) => {
      if (b.status === "rejected") {
        return (a += 1);
      } else {
        return a;
      }
    }, 0);

    const noResponse = applications.reduce((a, b) => {
      if (b.status === "applied" || b.status === "no response") {
        return (a += 1);
      } else {
        return a;
      }
    }, 0);

    return {
      interviews: interviews,
      jobsApplied: jobsApplied,
      offers: offers,
      rejections: rejections,
      noResponse: noResponse,
    };
  };
  console.log(getStats());
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4">Dashboard</Typography>
            <Typography variant="p"> Welcome </Typography>
            {username}
          </Paper>
        </Grid>
      </Container>
      <Container maxWidth="lg">
        <Grid container spacing={0}>
          {/* <Grid item xs={12}> */}
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <Typography variant="h4">Stats</Typography>

              {<Stats stat={getStats()} />}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Typography variant="h4">Interviews</Typography>
              {<Interviews interviews={getInterviews()} />}
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4">Recent Applications</Typography>
            {<ApplicationsList applications={applications} />}
          </Paper>
        </Grid>
        {/* </Grid> */}
      </Container>
    </div>
  );
};

export default Home;
// if local storage is empty redirect to homepage
