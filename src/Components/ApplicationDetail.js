import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Checklist from "./Checklist";
import JobListingDetail from "./JobListingDetail";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import ApplicationForm from "./AddApplication"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  title: {
    marginBottom: "10px",
  },
}));

const ApplicationDetail = (props) => {
    // console.log(props)

    const [state, setState] = useState({});
    const [showEditForm, setShowEditForm] = useState(false); 
    // const [applcicationId, setApplicationId] = useState("");

    const [editState, setEditState] = useState("");

    let user = window.localStorage.getItem("sojohub");
    const token = JSON.parse(user).userToken;
    useEffect(() => {
        fetch(`http://localhost:3000/applications/${props.match.params.id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json",
            }
        })
            .then((r) => r.json())
            .then((applicationObj) => {
                setState(applicationObj);
                console.log(applicationObj)
            });
    }, []);

    const handleUpdate = (todo) => {
      // console.log(todo)
      // console.log(state)
      //   setState({
      //       todo: todo
      //   })
      console.log(todo)

        fetch(`http://localhost:3000/todos/${todo.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json",
            },
            body: JSON.stringify(todo)
        })
            .then(r => r.json())
            .then(console.log)
    }




    const toggleEditForm = () => {
      setShowEditForm(true)
      setEditState({
        title: state.job_listing.title,
        company: state.job_listing.company,
        location: state.job_listing.location,
        description: state.job_listing.description,
        listingUrl: state.job_listing.listing_url,
        status: state.status,
        dateApplied: state.date_applied
      })
    }

    const handleApplicationUpdate = (obj) => {
     
      fetch(`http://localhost:3000/applications/${props.match.params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          Accept: "application/json",
        },
        body: JSON.stringify(obj)
      })
        .then((r) => r.json())
        .then(updatedApplication => {
          console.log(updatedApplication)
          setState(updatedApplication)
        })
    }

    const deleteApplication = () => {
      fetch(`http://localhost:3000/applications/${props.match.params.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          Accept: "application/json",
        },
      })
        .then((r) => r.json())
        .then((deletedApplication) => {
          console.log(deletedApplication);
          props.history.goBack();
          // props.deletePost((prevState) => {
          //   const newState = prevState.filter(
          //     (item) => item.id !== deletedThread.id
          //   );
          //   return newState;
          // });
        });
    };

    const classes = useStyles();
    console.log(state)
    return (
        <div>
            <Container maxWidth="lg" className={classes.title}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4">Application Details</Typography>
                    </Paper>
                </Grid>
            </Container>
           {state.job_listing && <ApplicationForm handleApplicationUpdate ={handleApplicationUpdate} application={state}/>}
            <Grid container spacing="2">
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <h3>Application Status</h3>
                        <p>{state.status}</p>
                        <br></br>
                        <JobListingDetail application={state}/>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Checklist todos={state.todos} handleUpdate={handleUpdate}/>
                    </Paper>
                </Grid>
            </Grid>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={deleteApplication}
            >
              Delete
            </Button>
        </div>
    )
}

export default ApplicationDetail;
