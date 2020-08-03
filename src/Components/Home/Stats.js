import React from "react";
import { Chart } from "react-google-charts";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import PeopleOutlinedIcon from "@material-ui/icons/PeopleOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  root2: {
    width: "100%",
    maxWidth: 660,
    // backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    // color: theme.palette.text.secondary,
    // backgroundColor: theme.palette.background.paper,
  },
}));

export default function Stats(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={3}>
          {/* <Paper className={classes.paper}> */}
          <div className={classes.root2}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button>
                <ListItemIcon>
                  <WorkOutlineOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Jobs Applied:"
                  secondary={props.stat.jobsApplied}
                />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <CheckCircleOutlineOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Accepted:"
                  secondary={props.stat.offers}
                />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <PeopleOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Interviews"
                  secondary={props.stat.interviews}
                />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <ThumbDownOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Rejections:"
                  secondary={props.stat.rejections}
                />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <AccessTimeOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="No Response:"
                  secondary={props.stat.noResponse}
                />
              </ListItem>
            </List>
          </div>
          {/* </Paper> */}
        </Grid>
        <Grid item xs={3}>
          {/* <Paper className={classes.paper}> */}
          <Chart
            width={"500px"}
            height={"300px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["Task", "Hours per Day"],
              ["Interviews", props.stat.interviews],
              ["Offers", props.stat.offers],
              ["Rejections", props.stat.rejections],
              ["Response", props.stat.noResponse],
            ]}
            options={{
              title: "Your Numbers",
              backgroundColor: 'transparent'
            }}
            rootProps={{ "data-testid": "1" }}
          />
          {/* </Paper> */}
        </Grid>
      </Grid>
    </div>
  );
}
